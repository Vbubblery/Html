$(document).ready(function(){

    load_from_localstorage();

    $('a.button').button();

    $("#datepicker").datepicker();

    $("#button_add").colorbox({inline:true});

    $("#button_submit").click(function(){
        var name = $('#name_input').val();
        if(name.length == 0){
    	    $('#validation').show();
        }
    	else {
    	    $('#validation').hide();
    	    $.colorbox.close();
    	    add();
    	}
    });
});

function ded(divNum) {
    if(confirm("Are you sure you have finished it?")) {
		var ids = localStorage['ids'];
		ids = ids.replace("*"+divNum+"*","");
		localStorage['ids'] = ids;
		load_from_localstorage();
    }
}

function load_from_localstorage()
{
    if(localStorage['ids'] == null) {
        localStorage['ids'] = new Array();
    }
    var ids = localStorage['ids'];
	if( typeof(ids) != "undefined") {
		var divHtmlArr = new Array();

        if(ids == null)
        {
            return false;
        }

		var arr = ids.split(',');

		for(i=0;i<arr.length;i++){
			var id = arr[i];
			id = id.replace(/\*/g,"");
			id = parseInt(id);

			if(id > 0){
				var divNum = id;
				var tipStr1 = localStorage[id+'name'];
				var tipStr2 = localStorage[id+'comments'];
				var tipStr3 = localStorage[id+'datepicker'];

 				divHtmlArr.push("<div class='note_item' id='div"+divNum+"' ");
 				divHtmlArr.push("style='overflow: auto;float:left;margin-left:1cm;background-image: url(0.png);width:250px;height:300px' >");
 				divHtmlArr.push("<div class='delete_wrap'><a class='delete_note' style='float:right; display:none;' onclick=\"ded('"+divNum+"')\" ><img src=\"deletebig.png\" width=\"20\" height=\"20\" align=\"right\" ></a></div><p class='note_title'>"+tipStr1+"</p>      <br/>&nbsp;&nbsp;"+tipStr2+"&nbsp;&nbsp;<p id=\"rw\">"+tipStr3+"</p></div> ");
			}
		}
		var tmp = divHtmlArr.join('');

		$('#main').html(tmp);

		bind_delete();
	}
}

function bind_delete() {
    $('.note_item').mouseover(function(){
        $(this).find('a.delete_note').show();
    });
    $('.note_item').mouseout(function(){
        $(this).find('a.delete_note').hide();
    });
};



var divNum = 1;


function add() {
    var ids = localStorage['ids'];
	if( typeof(ids) != "undefined") {
		var arr = ids.split(',');
		divNum = arr.length+1;
	}

    var tipStr1 = $("#name_input").val();
    var tipStr2 = $("#comments1").val();
    var tipStr3 = $("#datepicker").val();

    $('#form')[0].reset();

	var tmpList = new Array();
	var id = divNum;

	if( typeof(localStorage['ids']) == "undefined") {
		localStorage['ids'] = "*"+id+"*";
	}else{
		localStorage['ids'] = localStorage['ids'] + ',' + "*"+id+"*";
	}


	localStorage[id+'name'] = tipStr1;
	localStorage[id+'comments'] = tipStr2;
	localStorage[id+'datepicker'] = tipStr3;

	load_from_localstorage();

	divNum++;
}







