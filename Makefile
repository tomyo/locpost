deploy:
		scp locpost.html tools:/var/www/nextcloud/

dev:
	python3 -m  http.server