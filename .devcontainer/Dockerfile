FROM mcr.microsoft.com/devcontainers/python:0-3.10

RUN pip3 --disable-pip-version-check --no-cache-dir install poetry

# Node setup
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
	--mount=type=cache,target=/var/lib/apt,sharing=locked \
	sudo apt-get update -qq && sudo apt-get install -yqq gnupg2
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
	sudo apt-get update -qq && \
	sudo apt-get install -yqq nodejs
