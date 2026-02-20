//console.log("Perrito Guayo");
//document.write("<h1> Perrito Guayo x2 </h1>")

//var /*Que la variable tenga un a,bito general*/
//let /*ambito de bloque*/
//const /*Se usa para elementod que no cambian su valor en tiempo de ejecución*/

let c = 0, ci = 0, cd = 0;
        const count = document.getElementById("count");
        const incCount = document.getElementById("incCount");
        const decCount = document.getElementById("decCount");
        function inc() {
            c++;
            ci = (ci >= 10) ? 0 : ci + 1;
            update();
        }
        function dec() {
            c = c > 0 ? c - 1 : 0;
            cd = (cd >= 10) ? 0 : cd + 1;
            update();
        }
        function update() {
            count.textContent = c;
            incCount.textContent = ci;
            decCount.textContent = cd;
        }