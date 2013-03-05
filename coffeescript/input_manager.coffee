$("#year").focusout ->
  if $(this).val() <= 4
    $("#month").focus()
  else
    $("#last_name").focus()


value = $("#age").val() + "y" + $("#month").val() + "m"
$("age").val(value)

