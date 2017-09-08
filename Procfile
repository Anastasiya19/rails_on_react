web: bundle exec thin start -p $PORT
client: sh -c 'rm -rf public/webpack/development/* || true && cd client && bundle exec rake react_on_rails:locale && yarn run build:development'
web: java $JAVA_OPTS -jar target/*.jar
web: java $JAVA_OPTS -Dserver.port=$PORT -jar target/*.jar