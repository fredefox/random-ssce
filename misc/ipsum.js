var ipsum = "Portland ethical pork belly, brooklyn cardigan farm-to-table bicycle rights. Tousled you probably haven't heard of them kitsch, yuccie raw denim vegan meditation. Fanny pack umami ramps biodiesel, master cleanse quinoa chia plaid freegan venmo tumblr. Everyday carry direct trade etsy aesthetic kitsch, chia synth. Church-key before they sold out aesthetic gastropub, butcher leggings keytar. Vinyl meggings poutine williamsburg. Quinoa wolf vegan kale chips.\
\
Health goth trust fund yr etsy. Tote bag offal wayfarers flexitarian next level hashtag. Butcher whatever scenester fingerstache chillwave, distillery tattooed. Occupy next level lo-fi plaid, you probably haven't heard of them godard vegan schlitz pop-up cornhole pinterest. Vice marfa VHS austin, roof party bushwick flexitarian intelligentsia cred kogi. Bicycle rights heirloom banh mi keffiyeh. Pug raw denim brooklyn, drinking vinegar humblebrag etsy freegan single-origin coffee chartreuse YOLO tacos knausgaard beard.\
\
Roof party chambray bespoke sartorial. Semiotics messenger bag marfa, raw denim ennui artisan listicle hashtag chillwave. Blue bottle helvetica quinoa brooklyn trust fund four loko flexitarian twee wayfarers. Before they sold out microdosing pour-over, chillwave 90's fingerstache flannel tote bag bitters cronut VHS venmo. Hashtag ramps keffiyeh, jean shorts synth microdosing literally intelligentsia single-origin coffee whatever bushwick typewriter. Keffiyeh disrupt organic, banjo actually master cleanse literally tofu fap forage. Artisan tilde fingerstache sartorial before they sold out intelligentsia.\
\
Whatever hella synth cray lumbersexual tacos. Typewriter drinking vinegar poutine craft beer cliche venmo chicharrones artisan, kale chips irony kitsch skateboard small batch cardigan hammock. Shabby chic VHS farm-to-table blog fingerstache try-hard. Quinoa ramps everyday carry vegan fixie, freegan skateboard biodiesel trust fund forage synth. Disrupt 90's bespoke, hammock +1 jean shorts fingerstache master cleanse. Authentic tilde viral waistcoat brooklyn, sustainable hoodie. Normcore blog truffaut you probably haven't heard of them, fanny pack etsy neutra craft beer slow-carb."

var $inputs = ccm$("x-express-edit tr td input")
var l = $inputs.length

var ipsums = []; for(var i = 0 ; i < l ; i ++) { k = i*ipsum.length/l; ipsums.push(ipsum.slice(k, k + l));}

var inputs = $inputs;
var a = Array.apply(null, inputs).reverse();
function doSomeStuff(i, e, t) {
    debugger;
    e.value = i;
    e.dispatchEvent(new Event("change"));
}
function step(t) {
    var i = ipsums.pop();
    var e = a.pop();
    if(e == undefined) {clearInterval(id); return}
    doSomeStuff(i, e, t).then(step)
}
this.tm.then(step);
