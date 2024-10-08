FROM python:3.12.5-slim-bookworm AS python

FROM python AS python-build-stage

RUN apt-get update && apt-get install --no-install-recommends -y \
  build-essential \
  libpq-dev

COPY requirements.txt .

RUN pip wheel --wheel-dir /usr/src/app/wheels  \
  -r requirements.txt

FROM python AS python-run-stage

ARG BUILD_ENVIRONMENT=local
ARG APP_HOME=/app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV BUILD_ENV=${BUILD_ENVIRONMENT}

WORKDIR ${APP_HOME}

RUN apt-get update && apt-get install --no-install-recommends -y \
  libpq-dev \
  gettext \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

COPY --from=python-build-stage /usr/src/app/wheels  /wheels/

RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
  && rm -rf /wheels/

COPY . ${APP_HOME}
