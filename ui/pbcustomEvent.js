    _eventlists:{},
	_eventQueue:function( id ) {
	    var callbacks,
	        method,
	        topic = id && this._eventlists[ id ];
	    if ( !topic ) {
	        callbacks = jQuery.Callbacks();
	        topic = {
	            fire: callbacks.fire,
	            add: callbacks.add,
	            remove: callbacks.remove
	        };
	        if ( id ) {
	            this._eventlists[ id ] = topic;
	        }
	    }
	    return topic;
	},
   	on:function(type,fn){
   		this._eventQueue(type).add($.proxy(fn,this));
    },
    trigger:function(type){
    	var args = [].slice(arguments,1);
    	this._eventQueue(type).fire.apply(this,args);
    },