var Boards = new Meteor.Collection("boards");
if (Meteor.isClient) {
    Meteor.startup(function () {
        var onChange = function(oldPos, newPos) {
            Boards.find({name: 'eh'}, {limit: 1}).forEach(function (b) {
                Boards.update(b._id, {$set: {position: ChessBoard.objToFen(newPos)}});
            });
        };
        var cfg = {
            position: 'start',
            draggable: true,
            sparePieces: true,
            onChange: onChange,
            dropOffBoard: 'trash'
        };
        console.log('startup');
        console.log(Boards.find({}).count());
        var board = new ChessBoard('board', cfg);
        $('#flipOrientationBtn').on('click', board.flip);
        $('#startPositionBtn').on('click', board.start);
        $('#clearBoardBtn').on('click', board.clear);
        Deps.autorun(function () {
            Boards.find({name: 'eh'}, {limit: 1}).forEach(function (b) {
                console.log('new position:', b.position)
                board.position(b.position);
            });
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Boards.find({}).count() == 0) {
            Boards.insert({name: 'eh', position: ''});
        }
        console.log('hi');
        console.log(Boards.find({}).count());
  });
}
