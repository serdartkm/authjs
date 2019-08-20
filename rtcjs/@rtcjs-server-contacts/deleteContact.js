module.exports =function({socket,db}){

    socket.on("delete_contact", async (contact, fn) => {
        let deleteContact = null;
        try {
          deleteContact = db
            .collection("contacts")
            .findOneAndDelete({ userName:contact});
          fn(deleteContact)
     
        } catch (error) {
          console.log("mdb contacts error", error);
        }
      });
}