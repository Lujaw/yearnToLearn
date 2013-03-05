class Medium
    constructor: (@name) ->

    # Prototype method
    download: (episode) ->
        console.log 'Downloading ' + episode + ' of ' + @name

    # Static method
    @play: (episode, name) ->
        console.log 'Playing ' + episode + ' of ' + name

    playOn: ->
        console.log 'unknown'

class Podcast extends Medium
    constructor: (name, @description) ->
        super name

    listen: ->
        console.log 'Listening to ' + @name

    playOn: ->
        console.log 'iPod'

class Screencast extends Medium
    constructor: (name, @description, @author) ->
        super name

    watch: ->
        console.log 'Watching ' + @name

    playOn: ->
        console.log 'iPad'


podcast = new Podcast('Astronomy Cast', 'A fact-based journey through the galaxy.')
podcast.download 'the first episode'
podcast.listen()

screencast = new Screencast('RailsCasts', 'Ruby on Rails Screencasts', 'Ryan Bates')
screencast.download 'the 267th episode'
screencast.watch()
