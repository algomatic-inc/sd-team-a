# sd-team-nobushi/backend

## Development

### Initialize venv

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
export PYTHONPATH=$(pwd)
pytest --import-mode=importlib
```

### Run

```sh
python app/main.py
```

## Deploy to Google Cloud

```sh
gcloud auth login
```

```sh
make deploy
```
