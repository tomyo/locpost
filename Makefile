deploy:
		scp locpost.html ethberlin.png tools:/var/www/nextcloud/

dev:
	python3 -m  http.server
