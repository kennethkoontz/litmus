/* actions.js
 *
 * All actions are defined in this module. It is the 'business' logic of the
 * application.
 *
 */
var actions = module.exports = {
    /* Example:
     *
     * foobar: function() {
     *    this.render('./views/foobar.html');
     * }
     *
     * The foobar action will render an html file located at
     * './views/foobar.html'
     */
    index: function () {
        this.render('./views/index.html');
    }
}
