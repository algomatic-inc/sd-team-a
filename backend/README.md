# sd-team-nobushi/backend

## Development

```sh
python3 -m venv venv
source venv/bin/activate
```

### Install dependencies

```sh
pip install -r requirements.txt
```

### Test

```sh
pytest --import-mode=importlib
```

### Build Docker image and run

```sh
docker build -t nobushi-backend .
docker run --env-file ../.env -p 8000:8000 nobushi-backend
```

## Deploy

```sh
gcloud auth login
```

```sh
gcloud config set project sd-team-nobushi
```

```sh
docker build -t nobushi-backend .
```

```sh
docker tag nobushi-backend gcr.io/sd-team-nobushi/nobushi-backend && docker push gcr.io/sd-team-nobushi/nobushi-backend
```

```sh
export $(grep -v '^#' ../.env | xargs)

gcloud run deploy nobushi-backend \
    --image gcr.io/sd-team-nobushi/nobushi-backend \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars $(cat ../.env | grep -v '^#' | xargs | sed 's/ /,/g')
```
