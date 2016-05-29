Configuration File
========================

## Configuration File Setup
Create a configuration file named `configApp.json` and place it in this directory.

## Configuration File Value(s)
Make sure you include the URL for the Mongo database that the app should connect to as one of the configuration values. For example:

    {
        "MONGO_URL": "mongodb://<dbuser>:<dbpassword>@<databaseidentifier>.mlab.com:25772/<dbname>"
    }