# Project:  Spell Suggestor
# Description: Checks the spelling and suggests possible values as calculated from Data Science Algorithm
# Author:  Lujaw Shrestha


 (($) ->
   $.Spellchecker = (el, options) ->
     # Access to jQuery and DOM versions of element
     @el = el
     @$el = $ el
     @name = ""
     @isSuggestionShown = false
     @options = options
     @isSuggestedValue = false
     @isNameMatch = false
     @nameMatchConfidence = 0
     @debug = false

     # Add a reverse reference to the DOM object
     @$el.data "Spellchecker", @

# initialize the plugin
     @init = =>
       @config = $.extend {}, $.Spellchecker.defaultOptions, options
       @_bindEvents()
       @_kbdBindEvents()
       if @config.name_type is "first_name" then @._onExtraBindEvents();
       @

# publice method
     # @publicMethod1 = (parameters) =>
       # pass
     ###
     ###
     # sample private method. Uncomment to use (removed the @)
     # Be sure to use => for all funcs inside $.pluginName
     # that way you'll maintain scope.
     _suggestion = (name) =>
        age = @age || @config.age
        @name = name
        @year = @config.decade - age
        @data = ""
        dictionary_id = if (@config.name_type is "first_name")  then "yob" + @["year"]  else "surnames";
        finalUrl = @config.url + @name + "?dictionary_id=" + dictionary_id + "&max=" + @config.maxlength + "&api_key=" + @config.api_key;
        @nameMatchConfidence = 0

        $.ajax
            url: finalUrl
            context: document.body
            async: true
            success:  (response) ->
                console.log("success1") if @debug
                @data = JSON.parse(response)
                @_appendList(name)




       # pass
##

     # call init, and return the output
     @init()

   # object literal containing default options
   $.pluginName.defaultOptions =
     optionOne: 'value'
     optionTwo: 'value'

   $.fn.pluginName = (options) ->
     $.each @, (i, el) ->
       $el = $ el

       # Only instantiate if not previously done.
       unless $el.data 'pluginName'
         # call plugin on el with options, and set it to the data.
         # the instance can always be retrieved as element.data 'pluginName'
         # You can do things like:
         # (element.data 'pluginName').publicMethod1();
         $el.data 'pluginName', new $.pluginName el, options
 )(jQuery)
