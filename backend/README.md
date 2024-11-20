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
make deploy
```
