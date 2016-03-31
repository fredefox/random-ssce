(function(listName, fromId, toId) {
   ExecuteOrDelayUntilScriptLoaded(function() {
       // Establish connection to web and get list.
       var context = SP.ClientContext.get_current(),
           web = context.get_web(),
           listColl = web.get_lists(),
           spList = listColl.getByTitle(listName),
           reportError = function(_, err) {
               console.error(err.get_message());
           },
           moveItem = function(fromId, toId) {
               var override = SP.MoveOperations.overwrite,
                   fromItem = spList.getItemById(fromId),
                   toItem = spList.getItemById(toId),
                   fromFile = fromItem.get_file(),
                   toFile = toItem.get_file(),
                   doMoveItems = function() {
                       // We must first load the items so that we can get their
                       // paths.
                       var dir = toItem.get_item("FileDirRef") + "/",
                           fileName = fromItem.get_item("FileLeafRef"),
                           path = dir + fileName;
                       // ... and *then* perform the move.
                       console.info("mv '%s' '%s'", fileName, dir);
                       fromFile.moveTo(path, override);
                       context.executeQueryAsync(null, reportError);
                   };
               context.load(fromItem);
               context.load(toItem);
               context.executeQueryAsync(doMoveItems, reportError);
           }
       moveItem(fromId, toId);
  }, "sp.js");
})("TestCase", 36, 16);
