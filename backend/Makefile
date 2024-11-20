# Load environment variables from .env file
ENV_VARS := $(shell cat ../.env | grep -v '^#' | xargs | sed 's/ /,/g')

all: deploy

deploy:
	@echo "Deploying backend to Google Cloud Run..."
	gcloud config set project sd-team-nobushi
	docker build -t nobushi-backend .
	docker tag nobushi-backend gcr.io/sd-team-nobushi/nobushi-backend
	docker push gcr.io/sd-team-nobushi/nobushi-backend
	env $(grep -v '^#' ../.env | xargs) gcloud run deploy nobushi-backend \
		--image gcr.io/sd-team-nobushi/nobushi-backend \
		--platform managed \
		--region us-central1 \
		--allow-unauthenticated \
		--set-env-vars $(ENV_VARS)
