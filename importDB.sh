for f in DB_Export/*.json
do
echo "Processing $f file...";
mongoimport --db DelivCrous --jsonArray $f;
done