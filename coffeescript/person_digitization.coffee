class inputManager
    constructor: ->
        @debug =false
        @previous_selected_field = null
        @initializeForm()
        @isAutocompleteSelected = false
        @checkCookie()
        @previousImageUrl =""
        @nextImageUrl =""

    initializeForm: ->
        @bindEvents()
        @bindKbdEvents()
        @collapsibleInstructions()

    # initialize the facebox
    $('a[rel*=facebox]').facebox();

    #hide the image until the button is pressed
    $("#previous_image").hide();

    bindEvents: ->
        $("#first_name").focus ->
            $('.ui-autocomplete').hide();
            $(this).autocomplete(autocomplete_first_name);
            @.isAutoCompleteSelected = false;

        $("#last_name").focus ->
            $('.ui-autocomplete').hide();
            $(this).autocomplete(autocomplete_last_name);
            @.isAutoCompleteSelected = false;

        $("#middle_name").focusout ->
            $(this).val($(this).val().capitalize())

        $("#submit_btn").click ->
        # To close the instruction before submission
            if ($("h3.btn-showhide").hasClass("open"))
                $(".btn-showhide>a").click()
            @.submit_values();

      # shortcuts for the  unreadable and same as previous
        $(".name").focusout ->
            if  $(this).val().trim() is "-" and   ($(this).is("#last_name")) then $(this).val("<SAMEASPREVIOUS>")
            $(this).val($(this).val().trim().capitalize());

        # keypress validation in the input fields
        $('#last_name').keypress (e)->
            return @.inputLimiter(e, "NameCharacters");

        $('#age').keypress (e)->
            return @.inputLimiter(e, "NumbersSymbols");

        $('#middle_name,  #first_name').keypress (e) ->
            return @.inputLimiter(e, "Letters")

       # focus at the start
        $("#age").focus();

        #  To display the tooltip on age tip hover
        $("#age_tip").tipTip
         activation: "hover"
         maxWidth: 700
         defaultPosition: "bottom"
         fadeIn: 100
         content: "<ul class='age_tooltip'><li>Age may be written as a whole number (e.g.: 5) or as a fraction (e.g.: 6 1/12).</li><li>The fraction denotes the months (e.g.: 6 1/12 means 6 years 5 months)</li><li> Capture the months only if the age is less than 1.</li><li>Examples:  2 1/12 => 2   And  5/12 => 5m</li></ul>"

       # buttons for skipping the task
        $("#btn_unreadable").click ->
            @.skip_task();

        $("#btn_noname").click ->
            @.flag_task()

        # to show previous images
        $("#show_pvs_image").click ->
            @.show_prev_next_image()

        #validate the name by age
        $("#last_name, #first_name").focusout ->
            if  $("#age").val() then @.validate_name_by_age($(this).val());

        # To change the symbol in the instruction button
        $(".btn-showhide>a").live ->
            click ->
                string = ($(this).html() == "↑ Quick Help") ? "↓ Quick Help" : "↑ Quick Help";
                $(this).html(string);

    submitValues: ->
        if @.validate() then $("#cf_task_form").submit()
        else
            self.focus_empty_input()
            return false

    validate:  ->
        validated = true
        validated = false  if $("#last_name").val() is "" or $("#first_name").val() is ""
        validated = false  if $("#age").val() is "" or $("#age").val() < 0 or $("#age").val() >= 150
        validated





`
    input_manager.prototype.bind_kbd_shortcuts = function()
    {
        var self = this;
        var isCtrl = false,
            isShift = false,
            numeric_key_codes = [49, 50, 51];

        $(document).keyup(function(e)
        {
            if (e.which === 16) isShift = false;
            if (e.which === 17) isCtrl = false;
        }).keydown(function(e)
        {
            if (e.which === 16) isShift = true;
            if (e.which === 17) isCtrl = true;

            if (e.which === 13 && isCtrl && !isShift)
            { // Ctrl + Enter for skipping the task
                self.skip_task();
            }

            else if (e.which === 13 && !isCtrl && isShift)
            { // Shift + Enter for flagging the task
                self.flag_task();
            }

            else if (e.which === 13 && !isCtrl && !isShift && self.isAutoCompleteSelected == false)
            { // Enter to submit the task
                self.submit_values();
            }

            else if ((e.which === 112 || e.which === 80) && isCtrl && isShift)
            { // shortcut to view previous image Ctrl + Shift + P
                $("#show_pvs_image").click();
            }
        });
    };



`
