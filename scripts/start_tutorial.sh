
# ---- Base Node | Alpine Version ----
FROM node:10.15.2-alpine AS base

# Install Python, make, and bash to the alpine version
RUN apk add --update --no-cache \
    python \
    make \
    g++ \
    bash

# make the 'app' folder the current working directory
WORKDIR /app

COPY package.json .
#COPY package-lock.json .package-lock.json

# ---- Dependencies ----
FROM base AS dev_dependencies
RUN npm install
RUN cp -R node_modules /tmp/dev_node_modules


# ---- Dev ----
FROM base AS dev
# copy production node_modules
COPY --from=dev_dependencies /tmp/dev_node_modules ./node_modules
# copy app sources
COPY . .

