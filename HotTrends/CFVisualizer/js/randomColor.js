var randombgcolors=["green:white:yellow", "#DDF4FF", "#FFFF97", "#CFFF9F"]

var rbcssrule=""
var randomnum=Math.floor(Math.random()*randombgcolors.length)
if (randombgcolors[randomnum].indexOf(":")!=-1){
rbcssrule="background-color: "+randombgcolors[randomnum].split(":")[0]+";"
rbcssrule+="color: "+randombgcolors[randomnum].split(":")[1]+";"
}
else
rbcssrule="background-color: "+randombgcolors[randomnum]+";"

document.write('<style type="text/css">\n')
document.write('.randomcolor{'+rbcssrule+'}\n')
if (randombgcolors[randomnum].split(":").length==3) //if link color specified
document.write('.randomcolor a{color:'+randombgcolors[randomnum].split(":")[2]+';}\n')
document.write('<\/style>')
