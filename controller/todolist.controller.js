const TodoItem = require('../schema/todoItem');
const dateFormat = require('dateformat');

module.exports.createNewItem = (req, res) => {
    const createdAt = dateFormat(new Date(), "isoDateTime");
    const newItem = new TodoItem({...req.body, createdAt, completed: false});
    newItem.save().then(() => {
        res.send("created new item sucessfully");
    })
    .catch(err => {
        console.log(err);
        res.send("create failed");
    })
}

module.exports.list = (req, res) => {
    const {createdBy} = req.body;
    TodoItem.find({createdBy}).exec().then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send("get list failed");
    })

}

module.exports.removeItem = (req, res) => {
    const {_id} = req.body;
    TodoItem.findOne({_id}).remove().exec().then(result => {
        res.send("successfully removed");
    })
    .catch(err => {
        console.log(err);
        res.send("remove failed");
    })
}

module.exports.updateItem = (req, res) => {
    const {_id, ...rest} = req.body;
    TodoItem.findOne({_id}).update(rest).exec().then(result => {
        console.log(result);
        res.send("successfully updated");
    })
    .catch(err => {
        console.log(err);
        res.send("update failed");
    })
}