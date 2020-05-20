import $ from 'jquery';
import _ from 'lodash';

import 'purecss/build/pure-min.css';
import 'purecss/build/grids-responsive-min.css';
import 'selectize/dist/css/selectize.default.css';
import Song from '../lib/song';

const $factory = $('#factory');
const $songList = $('#song-list');

$.get('data/songs.json', (allSongs: Song[]) => {
    console.log('songs loaded', allSongs);

    _.each(allSongs, song => {
        const songMap: { [name: string]: any } = {
            ...song
        };

        const $songItem = _factory('song-item');
        const $songForm = $songItem.find('.song-form');

        $songItem.data('song', song);

        $songForm.find('input').val(function (i, v) {
            return songMap[$(this).data('prop')];
        });

        $songList.append($songItem);
    });

    function _factory(selector: string) {
        return $factory.children(`.${selector}`).clone();
    }
});