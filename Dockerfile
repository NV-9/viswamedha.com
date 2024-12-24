FROM docker.io/node:22.12-bookworm-slim as frontend

USER node

WORKDIR /code

COPY ./package.json ./package-lock.json /code/
RUN npm ci && npm cache clean --force

COPY ./ /code
RUN npm run build

FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1 \
    PYTHONUNBUFFERED 1 \
    PIP_NO_CACHE_DIR=1 \
    PATH=/usr/local/bin:$PATH

RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev \
    wait-for-it \
    gcc \
    gettext \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code

COPY requirements.txt /code/
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY --from=frontend /code/build /code/static/
COPY ./ /code

COPY ./start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

ENTRYPOINT ["/start"]