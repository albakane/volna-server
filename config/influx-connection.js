let Influx = require('influx');

let influx = new Influx.InfluxDB({
  host : '172.17.1.47',
  database : 'volnadb_test',
  schema : [
    {
      measurement : 'location',
      fields : {
        lat : Influx.FieldType.FLOAT,
        lng : Influx.FieldType.FLOAT
      },
      tags : [
        'registration_number'
      ]
    }
  ]
});

module.exports = influx;