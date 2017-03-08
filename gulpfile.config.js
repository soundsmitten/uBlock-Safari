var path = require('path');
var OUTPUT = {
    chrome: 'uBlock0.chromium',
    safari: 'uBlock.safariextension'
};

module.exports = function(browser) {
    var PLATFORM = path.join('platform', browser);
    var DEST = path.join('dist/build', OUTPUT[browser]);

    return {
        DEST: DEST,
        extension: ['serverlist', 'justdomains'],
        tasks: {
            assets: [{
                src: ['assets/assets.json'],
                dest: ''
            }, {
                src: ['../uAssets/thirdparties/**/*'],
                dest: 'thirdparties'
            }, {
                src: ['../uAssets/filters'],
                dest: 'ublock'
            }].map(function(asset) {
                return {
                    src: asset.src,
                    dest: path.join(DEST, 'assets', asset.dest)
                };
            }),
            css: [{
                src: [
                    'src/css/*.css',
                    path.join(PLATFORM, 'css/*.css')
                ],
                dest: path.join(DEST, 'css')
            }],
            html: [{
                src: [
                    'src/**/*.html',
                    path.join(PLATFORM, '*.html')
                ],
                dest: path.join(DEST)
            }],
            js: [{
                src: [
                    'src/js/**/*.js',
                    path.join(PLATFORM, '*.js')
                ],
                dest: path.join(DEST, 'js')
            }],
            lib: [{
                src: ['src/lib/**/*.js'],
                dest: path.join(DEST, 'lib')
            }],
            static: [{
                src: [
                    'src/**/*',
                    'LICENSE.txt',
                    path.join(PLATFORM, '**/*'),
                    '!src/**/*.{js,css,html}',
                    '!src/lib',
                    '!' + path.join(PLATFORM, '**/*.{js,css,html}')
                ],
                rename: {
                    'src/img/icon_128.png': 'Icon.png'
                },
                dest: DEST
            }]
        }
    };
};