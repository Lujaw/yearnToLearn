class test
    constructor: (@name) ->
        console.log(@name)

    name: ->
        console.log(@name)

    @display: ->
        console.log("this is a test")

test1 = new test
test.name()
test.display()


