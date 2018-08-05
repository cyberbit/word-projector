$.get('data/songs.json', allSongs => {
    let id = 0;
    allSongs.forEach(song => song.id = ++id);
    $('#songs').selectize({
        plugins: ['remove_button', 'drag_drop', 'restore_on_backspace'],
        maxItems: null,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        options: allSongs,
        onChange: function(ids) {
            const selectedSongs = ids
                .map(id => parseInt(id, 10))
                .map(id => allSongs.find(song => song.id === id));

            $('#presenterFrame').trigger('songs:change', [selectedSongs]); // TODO WebSocket.send
        },

        openOnFocus: false,
        onInitialize: function() {
            var that = this;
            this.$control.on('mousedown', function() {
                if ($(this).find('input').is(':focus') && ! this.didClose) {
                    this.didClose = true;
                    that.close();
                }
                else {
                    this.didClose = false;
                    that.open();
                }
            });
        }
    });
});