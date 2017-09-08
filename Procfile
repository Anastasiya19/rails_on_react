web: rails s -p 3000 -b 127.0.0.1
client: sh -c 'rm -rf public/webpack/development/* || true && cd client && bundle exec rake react_on_rails:locale && yarn run build:development'
web: java $JAVA_OPTS -jar target/*.jar
web: java $JAVA_OPTS -Dserver.port=$PORT -jar target/*.jar