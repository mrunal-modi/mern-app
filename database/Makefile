build:
	docker build -t database .
run:
	docker run --publish 27017:27017 -d database
down:
	docker stop database && docker rm database