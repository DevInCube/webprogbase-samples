use local;
db.groups.insert({ name: 'КП-61', year: 2016});
db.groups.insert({ name: 'КП-62', year: 2016});
db.groups.find().pretty();
db.groups.findOne({name: 'КП-61'});
db.groups.remove({ _id: ObjectId("--ID--")});
