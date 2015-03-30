$(document).ready(function() {
    $('.fa-thumbs-o-up').click(function() {
        var id = $(this).attr('id');
        $.ajax({
            type: "put",
            url: "http://localhost:3000/api/idea/vote/" + id,
            data: {
                vote: 'upvote'
            },
            success: null,
            dataType: null
        });

    });

    $('.fa-thumbs-o-down').click(function() {
        var id = $(this).attr('id');
        $.ajax({
            type: "put",
            url: "http://localhost:3000/api/idea/vote/" + id,
            data: {
                vote: 'downvote'
            },
            success: null,
            dataType: null
        });
    });
})