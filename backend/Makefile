# Load environment variables from .env file
ENV_VARS := $(shell cat ../.env | grep -v '^#' | xargs | sed 's/ /,/g')
PROJECT_ID := sd-team-nobushi

all: deploy

check-permissions:
	@echo "Checking permissions..."
	@gcloud config set project $(PROJECT_ID)
	@gcloud projects get-iam-policy $(PROJECT_ID) \
		--flatten="bindings[].members" \
		--format='table(bindings.role)' \
		--filter="bindings.members:$$(gcloud config get-value account)" \
		> /dev/null 2>&1 || \
		{ echo "Error: You do not have the necessary permissions for project $(PROJECT_ID). Please try following command: \n\ngcloud auth login\n"; exit 1; }

deploy: check-permissions
	@echo "Deploying backend to Google Cloud Run..."
	gcloud config set project $(PROJECT_ID)
	docker build -t nobushi-backend .
	docker tag nobushi-backend gcr.io/sd-team-nobushi/nobushi-backend
	docker push gcr.io/sd-team-nobushi/nobushi-backend
	env $(grep -v '^#' ../.env | xargs) gcloud run deploy nobushi-backend \
		--image gcr.io/sd-team-nobushi/nobushi-backend \
		--platform managed \
		--region us-central1 \
		--allow-unauthenticated \
		--set-env-vars $(ENV_VARS)
