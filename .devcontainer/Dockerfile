FROM mcr.microsoft.com/devcontainers/python:0-3.10

ENV PYTHONUNBUFFERED 1

# [Optional] If your requirements rarely change, uncomment this section to add them to the image.
COPY requirements.txt /tmp/pip-tmp/
RUN pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/pip-tmp/requirements.txt \
   && rm -rf /tmp/pip-tmp

# Node setup
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
	--mount=type=cache,target=/var/lib/apt,sharing=locked \
	sudo apt-get update -qq && sudo apt-get install -yqq gnupg2
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
	sudo apt-get update -qq && \
	sudo apt-get install -yqq nodejs
