import math
import geopandas as gpd
import mercantile
import requests
from PIL import Image, ImageDraw
import json

__all__ = ['geojson_to_img']


def calculate_zoom_level(bounds, image_width=1024, image_height=1024, tile_size=256):
    """
    適切なズームレベルを計算
    :param bounds: バウンディングボックス [minx, miny, maxx, maxy]
    :param image_width: 合成画像の幅 (px)
    :param image_height: 合成画像の高さ (px)
    :param tile_size: タイルサイズ (px)
    :return: 適切なズームレベル (int)
    """
    lon_diff = bounds[2] - bounds[0]
    lat_diff = bounds[3] - bounds[1]

    # 経度と緯度のタイル幅を計算
    lon_zoom = math.log2(360 / lon_diff * (image_width / tile_size))
    lat_zoom = math.log2(180 / lat_diff * (image_height / tile_size))

    # 最小のズームレベルを選択
    zoom = int(min(lon_zoom, lat_zoom))
    return max(0, min(zoom, 20))  # ズームレベルは0〜20の範囲に制限


def lat_lon_to_px(lat, lon, zoom, tile_size=256, min_x=0, min_y=0):
    """ 緯度経度をピクセル座標に変換 """
    scale = tile_size * 2 ** zoom
    x = (lon + 180.0) / 360.0 * scale - min_x * tile_size  # タイルオフセットを減算
    y = (1.0 - math.log(math.tan(math.radians(lat)) + 1.0 /
         math.cos(math.radians(lat))) / math.pi) / 2.0 * scale - min_y * tile_size
    return x, y


def geojson_to_img(geojson_str):
    geojson = json.loads(geojson_str)
    # タイルサーバーURL
    TILE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

    gdf = gpd.GeoDataFrame.from_features(geojson['features'])
    gdf = gdf.set_crs(epsg=4326)

    # バウンディングボックス取得
    bounds = gdf.total_bounds  # [minx, miny, maxx, maxy]

    # 適切なズームレベルを計算
    zoom_level = calculate_zoom_level(
        bounds, image_width=1024, image_height=1024)

    # タイル範囲計算
    tiles = mercantile.tiles(
        bounds[0], bounds[1], bounds[2], bounds[3], zoom_level)

    # タイル画像を結合
    tile_size = 256
    tiles_list = list(tiles)
    min_x = min(t.x for t in tiles_list)
    min_y = min(t.y for t in tiles_list)

    merged_width = (max(t.x for t in tiles_list) - min_x + 1) * tile_size
    merged_height = (max(t.y for t in tiles_list) - min_y + 1) * tile_size
    merged_image = Image.new("RGB", (merged_width, merged_height))

    # タイル画像ダウンロードと配置
    for tile in tiles_list:
        url = TILE_URL.format(z=tile.z, x=tile.x, y=tile.y)
        response = requests.get(url)
        if response.status_code == 200:
            tile_image = Image.open(requests.get(url, stream=True).raw)
            x_offset = (tile.x - min_x) * tile_size
            y_offset = (tile.y - min_y) * tile_size
            merged_image.paste(tile_image, (x_offset, y_offset))

    # 描画準備
    draw = ImageDraw.Draw(merged_image)

    tiles_list = list(mercantile.tiles(
        bounds[0], bounds[1], bounds[2], bounds[3], zoom_level))
    min_x = min(t.x for t in tiles_list)
    min_y = min(t.y for t in tiles_list)

    for geom in gdf.geometry:
        if geom.geom_type == 'LineString':
            coords = [
                lat_lon_to_px(lat, lon, zoom_level, min_x=min_x, min_y=min_y)
                for lon, lat in geom.coords
            ]
            filtered_coords = [
                coord for coord in coords
                if 0 <= coord[0] < merged_width and 0 <= coord[1] < merged_height
            ]
            if len(filtered_coords) > 1:  # 線を描画するには2点以上必要
                draw.line(filtered_coords, fill="blue", width=3)
            else:
                print("Filtered coords are insufficient for line drawing.")

    # merged_image を png として返す
    return merged_image
