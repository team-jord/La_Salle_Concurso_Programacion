const db = require("../models");
const PDFController = db.pdf;
const TechnicalFile = db.technicalFile;
const EvaluationAct = db.evaluationAct;
const CoreFile = db.coreFile;
const TechnicalFileEvaluationAct = db.technicalFile_evaluationAct;
var pdf = require("pdf-creator-node");
var fs = require("fs");
const convert = require('numero-a-letras');

exports.getServiceRequestPDF =  (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.serviceRequest, as: 'serviceRequest' },
            { model: db.coreFile, as: 'coreFile' }
        ]
    }).then(data => {

        const myURL = ('https://verificadora-uvie.s3.us-west-2.amazonaws.com/verificationRequest.html?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMSJHMEUCIQCNyRVB5mhF3fhfqoGDwPqcdmFpwbPnulMXmpcnr9QuUQIgfhfVXUnKpKh1o7sCv2FZRwjiQzSqsfm4A2P91jZIjAAq5AIIPRAAGgw0NDc1MjgzNTIwNzgiDK3wGAeVq8uRR6RyVSrBAtiLM6NQLxAn%2Fnk4ToRpoHddmG8ESTEBSc5xW7bcaYf619Md63TmE%2BuTM%2Bv71%2BA0tHYMtq69qH3r9k8LHxEzIXhfv2q3oSHNu6rAqshnQrxoKA8M4RQjG14w%2BhwtKwg6Ugufuvd5eiRzjWW02UiW%2BzN2IYBRgz4O3j1Edp4ze5lsuwvXiLCCxUVE9PSwFShwLbyuiMdo%2Bfre6L7OmgSzTzADPLjcbgukMfrWOh7hNDxpge%2BiprmsclE3HWunXUDM0wqe4cpRVd7kpNaCsuZs6D7bafc%2Fnom%2FZFrhPReKEmOuzJ1n3lICYQpqheAwxvILKkjr0mo7dxtkY9J%2BZc9cVySo8shpCoeemklEymCqaRWVmx8wqwRlODxFOJA6QuYrcI3Tx3uGBinr7WPjXU%2FCf15waPVfDiCn3WmQ2xREMx0aLjDJ6eqYBjqzAkLJlrJxwBNNQtAJTcMBx2Zm233IAN7INjADDQkXM9IUxUBOZpVoeq1XwxOlc151T7Gw0Fl5%2F8sFZ2onmeCAVuxvqMxl8XT8oiaPnSaflfIxuAQzQ9SEMBgQwKmyXBFLAEgnS2j8KqkVO4djbuhEts1w%2BwbCh7KtpjmZh%2FZfSHzko%2FCfyaPkW%2BRYWHwnWVzCYE0zwZdZSEDmEFHdtFdHbNPwUv1ynnJh7l13J%2FW04GrL0GmU2%2FOj89WoAETtqRV0T8FG7hDU6sVb1I0rA8h%2F1Rd1%2FU4bIZg3VUwIfvKq4zvrfCZeWH2r8hXxe2Y3PuBU8IapiSxGf1OEZ%2FpEMjx2cUKlE4Y83M2RBKewuSxT2aFF5IgYCoOmiSOweC%2FIAjIrdAVJdPIdt4ZKaQaO1xA%2Fm2AQmM4%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220909T140538Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAWQMWEXFHBIYKTIHY%2F20220909%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=671e02d25c0e8c3851f8f89687598bf1ccf36e396e05b55ef703a0c89c10a0fd');

        let fileData = "";

        const https = require('https');

        let aaa = https.get(myURL)

        console.log(aaa)


        // const html = fs.readFileSync(myURL);

        var options = {
            format: "A4",
            orientation: "portrait",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm',
            },
            header: {
                height: "45mm",
                contents: "<table style='width: 5.2e+2pt;margin-left:auto;margin-right:auto;margin-bottom: \"20px !important\"'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,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'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>SOLICITUD DE VERIFICACI&Oacute;N</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FC</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-03.01</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;02</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>31-May-2022</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents: {
                    first: "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'> " +
                        "Tel. 951 6887317 </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>Carretera Internacional Km 5 " +
                        "LT 29&nbsp;</span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>Correo:" +
                        " verificacion@omico.com.mx</span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>Local 3, San sebastian " +
                        "Tutla, san</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                        ";font-family:Arial,sans-serif;'>Sebastian Tutla, Oaxaca.&nbsp;</span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                        "text-align:center;'><strong><u><span style='font-size:19px;color:red;'>ORIGINAL</span></u></strong></p><p style='margin:0in;font-size:13px;" +
                        "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                        "autorizaci&oacute;n del Titular de la UVIE</span> </p>",
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value                    
                }
            }
        };

        let array = []
        array.push(data.toJSON());

        // var document = {
        //     html: html,
        //     path: "./output.pdf",
        //     data: { data: array },
        //     type: "buffer",
        // };

        // pdf.create(document, options)
        //     .then((response) => {
        //         res.send(response);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

    });
}
exports.getPriceRequestPDF = (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.priceRequest, as: 'priceRequest' },
            { model: db.coreFile, as: 'coreFile' }
        ]
    }).then(data => {
        var html = fs.readFileSync("./templates/priceRequest.html", "utf8");

        var options = {
            format: "A4",
            orientation: "portrait",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm',
            },
            header: {
                height: "45mm",
                contents: "<table style='width: 5.2e+2pt;margin-left:auto;margin-right:auto;margin-bottom: \"20px !important\"'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAD8CAMAAAAFbRsXAAABMlBMVEX////zkgCkyD6Ptzw8PDvqWwzzkADziwDzigDyjQDj4+MmJiShxjStzlX2nyf0lg6y0GChxy74sFr4tGj+9+r0mBz+8eH5xY+gxjHU5ar9373G3Y7C2of3uXjpUgD+6dPz+Oj91q/M4ZrpTwD6/PSewz3948f6z6W92HnxkGv95cuKtDCXvT2Guj/o8dKGsiMvLy72pED6yJSXvUn5uG73rFPk78nqmQ6ey0Gvwjh9fXyenp7udDz5yripy0j+9/L8593vfUrc6rvA1pm0zoKqyHCfwV2synXM3qzHoh2ZsCWyrC7gmxWmsDOXtTi9qCjZnRm2vTTTqiPCtS3CwsIJCQVeXl2NjY2mpqbQ0NBtbWzb29pISEf4wKv0qInymnn62cz2tZvtaQDwhljwfBr2tIkE/KjJAAAMkElEQVR4nO2dC1fbRhbHJSWMpCDbCBu/wA+CCwRSgx0gjwackISm227b3aRpspuEtOl+/6+wM3rYesydkSyN5aTzOz3pwWCYv+/MvXeu5qEoEolEIpFIJBKJRCKRSCQSiUQikaRiUqv3MPXaoOiWzMukt91Y30C6bui68w8qrze2e0U3Kx2T3U7Z1E0TIaROwV+YpmGOGgdFNy8hk+1TXTcDCsIgrLDaLrqRfHbXDVjE1DamfrLUnWwwVnWeCl+MUd4uurkQk4bJNUZQiq7uFd1kKuNUMhwpprp8VmmraWW4Vikv11ipjYw5ZDhSjJNYqOwPXz57/uLq6t6NG/eurr5//uxy2F+Mjr2kQ5yGiXZnv2n48vm9o6NDzA0f8sXh0dYCZExOjfllOEbpOL+n//LF4VFAQYC7zUvxOnqqmUkHRi/X+s/uASIw32j2ULiO7XlHx8wipvrDP44gERhN02zhOhrZuhVxXPd//PZbWAU2h6ZZa6J1nOhZZfz0T5YKxxxYyG3BOtYzDg+ujLuODuFDJKMOs/IjW4bTrTTxQ6SaSQcyf+DI8MyBe9a+UB2dTOND/+nnhObABjkTqWMvi79C5i8cGTe0GUJ71kEmHRWeOe4GdFgi85MJyhAH9V851gh0K9E+a5RFB69bBc2BuRCoY5xsoCPT1F1IScV/ManT9Wi2xOmoJ9BByiWjzvZur445aI+rG7qOxSCVEwNvaBFsgbW9Mrdj4Rl5rIA1aVdNvfJzqm6Fh/qmOB17PIMgY30XeCtHxzdRHSINMuFMz5FRrQNvHdxLZw6xBjlhpyYmXFDg6IibQ6hB6sxQiIwx/NYrxvQpPsodlyUwga+yOhZSGfWdFywdlG5FepY4HUyDmOUJ/M5nLB20boU7lsCiQ4cxQsxTxhsvj9KaQ+gUl+WymDr6DB10c2CD9MUJ2YMNYo5Yb4QdFmAOrENgcsII6qjCet9zcICAOoTWTnrgUEcmFAUJQ7BjQd1KbJLFGOo66xHBILU5RE9wK1DPQqyBDnYs2ByaLbSW1QPTRbPGeBvgsRjmEF05GUM9y2yw3naVWof2EEifcwKa4SKTNTDPqAZhydA0tSNUyHwGoYUQpjk07b5ZFqkDdL4Ga4RcUkY6Y5Q7OpBqMrK2zGwDFmG7rLhBOOYgOlRd5FIPKIowY0g8WUyiQzVFPoWHxjqzG8QMwlbx4KEbq9CJQCEqXQhiZYvR5IRjjgf/8gpgzF+akQkQDpk+6/vwUOeM8gev/L+BVHFCoLqczli2NDhKYQ7twa+zPyHQbR1AQhh578vDFOZ4GEzldJZLz0YbcFqszy6YnfDM8UtoBYUubpkKEEZYM6pAusgb5Q/vh3+9wEACTHMRI5uY9Sx2t3qg/TtaDGCNvIwAuS/LUb5IaI5Xcc++VEIGh4nM8eo+xY0UIATuWl40ZKloNrEMWqAVKAQaIxvgO5ziIqNbWbbW6gPLcgQKgbwWHIOvWN3Katr7Z4pSg6KTOK+VPo4cguawbHv/0plWQnUAgXEk9Z/sH9HMgS1hlzanxZ429FvFRXYw14KmI0PNtu1m0/JoNrEE+2K/NQzO8BuQnQXW5wAhrKlDf3jZat3e3Nra2rzdap1R1osCkxx2BTYjQHku29+Eps8C5yPKKTBDZKW/PHahSY7IehDYnRnPDXmcQNNnkXN2yP8yQiIXaHWOQO/LeH5ozP1Xt6FqskinBVYfVLQ+72+EHhwJHeuKsg49VTDmHO5QNOQUYTMDlRrnNgn4JE9ooRFO8LBJ5vrD4PIckcUgB/ATnMtxwc+6UTX3poeBIsl8AQwKsEInIy6MtXNG6mdM8IJC4T2LtSoTMR8jUtiFV7UIzU9cwABGcsdURc46YzHIvN48DVBMJErKKaJxnbFyWHA0dIGHO3FdiW3Csof4oU6YsBYCMtedBWmzNsplyUFTwFqwpSI9UfbdYO7MYj7Jyw/OIlNjndu9aiPm8k5WLTlXwOUPXjt4U6IGZ/+lsbDt7uDKGl9JhdE39hBnIxD7WXeutHl7R3BbG9RIUO8g7ubkLAWAtPB3iSFTL4/DHmxw0Cjzjx8QPREJk2gbDNmuUD5p7LUxe42TMuskiMC7FuN6fbidy28WMj2S7gBaRHIShLM+fm70DIWl+eBvIZkHc+4ixtzU5jkagceCB4hLpv17gI60M5p82M5bCZq/zJeNTHtDKSwuNYkyzlVJcTpyVYKK1MHuXbEQiFiTW13sOl8u4NkVSD9dD3topFZHYGERFX5iTZuuBKk41ZgEo6ZTHd6FntQX4nfDHNDXXzgzkuDzbPd5B7V0gdCCEyw6dVqByJtUzL7jzV9pjxHYO08WCK1C5QuZfscXErfI0uigKkkuZIl0kLEQVZJciOAnOimJ1aMTCzGW7NCz6BOCpEIWUHZPyak5j5CF1eKSMwk74YRCFln6SUq4HpFMSJalH+IIPRBMJKSQmS2f0OPFRELSP3VcDMHnDUmELLDIm46ajqZMhUzxc63ZK0VN0fmcqBUfL5+dvVDxhKDpC+qyGkQikfyNmNxKTtFtZfL6t9WE/Pa66LYyubV6MyGry20RJamOm8dFt5TDm6RC3hTdUg6PjhMa5FHRLeXwe1IhvxfdUg7fJRXyXdEt5fBWClkyEgt5W3RLObz+WoS8SxjaV98V3VIOSXOUZc9QFOV9MiE3i24nl2QRcekDe9JBsrrcSbxDoo617LkvIUkkWfpw6PCVGATHRO4oWV32aOjxH07nOl72SdUUnkWKbl9ibjFNsvxBfQZLyfF/i25dGm69B6Qcv/+C7OHwiOq7Vpc/NYnx7n1Myur7ZU/e6bx+s3o87WHHx6tvvoAEC+DW20c33VLvzUdvv7TBEWPpK+8SiUQikUgkXxhPnhTdgjz48HRn52PRjcjOeXenu7Ij8tD3DKRo1p2dlZWV7h1xbclEwxhF9qQ9fXx9TvvJp12sY2XnCRY/HlUVZbQRx702oV8KsDm78nCoXazh716UolzkcC1iw0RG+MyV850ubSDccXR0H5MTbUyyg7iM4jgHdfRtK4hteffxDG3NKpH/WRFyud+R7IyK3NrgNLj7Kfxz56RfYYOcK2MDOdvDaJusyUUMfVtrltZ8LmzLu1gI69C0ErHXWphSbkIiZxh8dPvQh5g6gnvqHiBExz2rH7nxpX9bG3g6LEdIjLNmbkIQCr408T78T4HXPIN0/3Cv3KUKQQZZ7nthNWm36mEddmvNogm5zE9IZBOROxxWugGP9njFf8nZgxEQovsYqnNoCv3mGqLjtlKiCinlcjuXK8QM7SL65H38d2KvXHtH1QWE9Hy8/SL0K2YHJdLfqEJaNtWEeQjxP/9Z7Pvs2gj73poREhLulATgrtwBGfE0IQM7n3v4qEL8EeE74Sfe10+VuYU40IRsWfncw0cV4vsof5Rcd33fm7sQHFXyuS6NLuRj13dSBM+NYd+bv5CSldNtx3Qhje6s6WFZESGq2pnR9oQMWwHYQi7tvK6fBoT8uTLtTIrSDYz9mJDA7hfX/WqW3ZxhB51xXIiV2/11gBDDswhOrZQPQW8cExLds4TzEDuAZgc+8ZiQzWZuFyMCQpBvkk/TkU/yXpYQ0z3aU7PWzvpThlpQSVQITstyu0bbPeMsemBUFf3l+a3PU1/8WGEK8TPPyGDvNzV7Gu+iQtbyGumKv50+enpiBVV8O0z86HhOF+Id6WT457JHvVY/cPFsRMiZneNFfN4R0uGz9ck5CH/5oyTkwOJC9hza0yQg5n73LQ0Qku9Nle5GXDN00D051dQ3iR8b/6AKSRBHQCGtZq6XHXu3GwcPYXE3fv8VFjLJW8ggx5FO8Dfez87m9A6p2egGdVwreQvZt3K+OtT3Psa6s53zwD+qpfJnQIjre/MUMshzpDtMT9NCOiqXzekZD+h/M5OQvJcqRFW3fXYnaYXkfQfq7NC54BFAekMJGGRaIHKFkN3qYfdrmrrecYVEPujFCVFo54+SS5o/zkwy/VlXCDngL158cGKiFbmOuWXT44gIIRQlzmXT0/Td972+ECcboVRRSLnLqTKEdMyidykw9xAiROmEzztCXpz2qhDBMgQR4mYj1LpWncRrnF5teuz7Oi7JSxfaBf5361KcEKU3mh7hiUyj7J0P8GmnS9i5nv1gzfCzkQ0zXmk0yEkPWEm8irhJ6ovkFh/LcnMvQUKwlM6Gbuj4v43ObFf99R3C5yezH5tUx1655KRKwZmSnAXzeK9fbQVe2nKFiLu5eVDv9epL+tRAIpFIJBKJRCKRSCQSiUQikUgkXxf/B9aGTLK4heA7AAAAAElFTkSuQmCC'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>COTIZACI&OacuteN DE VERIFICACI&Oacute;N</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FC</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-03.02</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;02</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>31-May-2022</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents:
                    "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                    "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    "Tel. 951 6887317 </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>Carretera Internacional Km 5 " +
                    "LT 29&nbsp; </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>Correo:" +
                    " verificacion@omico.com.mx</span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>Local 3, San sebastian " +
                    "Tutla, san</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                    ";font-family:Arial,sans-serif;'>Sebastian Tutla, Oaxaca.&nbsp;</span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                    "text-align:center;'><strong><u><span style='font-size:19px;color:red;'>ORIGINAL</span></u></strong></p><p style='margin:0in;font-size:13px;" +
                    "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                    "autorizaci&oacute;n del Titular de la UVIE</span> </p>",

            }
        };

        let array = []
        array.push(data.toJSON());

        const options1 = { style: 'currency', currency: 'MXN' };
        const numberFormat1 = new Intl.NumberFormat('es-MX', options1);

        // currency format is applied to the amounts and also converted to text
        array[0].priceRequest.verificationCostLetter = convert.NumerosALetras(array[0].priceRequest.verificationCost)
        array[0].priceRequest.advance = numberFormat1.format(array[0].priceRequest.advance);
        array[0].priceRequest.settlement = numberFormat1.format(array[0].priceRequest.settlement);
        array[0].priceRequest.verificationCost = numberFormat1.format(array[0].priceRequest.verificationCost);

        var document = {
            html: html,
            data: {
                data: array,
            },
            path: "./output.pdf",
            type: "buffer",
        };

        pdf.create(document, options)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
            });

    });
};

exports.getVerificationContractPDF = (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.verificationContract, as: 'verificationContract' },
            { model: db.coreFile, as: 'coreFile' },
            { model: db.priceRequest, as: 'priceRequest' },
            { model: db.serviceRequest, as: 'serviceRequest' },
        ]
    }).then(data => {
        var html = fs.readFileSync("./templates/verificationContract.html", "utf8");

        var options = {
            format: "A4",
            orientation: "portrait",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm',
            },
            header: {
                height: "45mm",
                contents: "<table style='width: 5.2e+2pt;margin-left:auto;margin-right:auto;margin-bottom: \"20px !important\"'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,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'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>CONTRATO DE SERVICIO DE VERIFICACIÓN</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FC</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-03.03</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;02</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>31-May-2022</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents:
                    "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                    "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    "Tel. 951 6887317 </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>Carretera Internacional Km 5 " +
                    "LT 29&nbsp; </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>Correo:" +
                    " verificacion@omico.com.mx</span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>Local 3, San sebastian " +
                    "Tutla, san</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                    ";font-family:Arial,sans-serif;'>Sebastian Tutla, Oaxaca.&nbsp;</span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                    "text-align:center;'><strong><u><span style='font-size:19px;color:red;'>ORIGINAL</span></u></strong></p><p style='margin:0in;font-size:13px;" +
                    "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                    "autorizaci&oacute;n del Titular de la UVIE</span> </p>",

            }
        };

        let array = []
        array.push(data.toJSON());

        const options1 = { style: 'currency', currency: 'MXN' };
        const numberFormat1 = new Intl.NumberFormat('es-MX', options1);

        // currency format is applied to the amounts and also converted to text
        array[0].priceRequest.verificationCostLetter = convert.NumerosALetras(array[0].priceRequest.verificationCost)
        array[0].priceRequest.advance = numberFormat1.format(array[0].priceRequest.advance);
        array[0].priceRequest.settlement = numberFormat1.format(array[0].priceRequest.settlement);
        array[0].priceRequest.verificationCost = numberFormat1.format(array[0].priceRequest.verificationCost);

        // formatting date
        let date = new Date(array[0].verificationContract.signDate)
        const dayOfWeekName = date.toLocaleString(
            'es-ES', { month: 'long' }
        );
        array[0].verificationContract.day = date.getUTCDate();
        array[0].verificationContract.year = date.getFullYear();
        array[0].verificationContract.dayOfWeek = dayOfWeekName;
        array[0].verificationContract.hour = '12:11'

        var document = {
            html: html,
            data: {
                data: array,
            },
            path: "./output.pdf",
            type: "buffer",
        };

        pdf.create(document, options)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
            });

    });
};

exports.getEvaluationActPDF = async (req, res) => {
    let actId = req.params.actId;
    let fileId = req.params.fileId;

    let evaluationAct = await EvaluationAct.findByPk(actId);

    let technicalFile = await TechnicalFile.findByPk(fileId, {
        include: [
            { model: db.coreFile, as: 'coreFile' },
            { model: db.priceRequest, as: 'priceRequest' },
            { model: db.serviceRequest, as: 'serviceRequest' },
        ]
    });



    var html = fs.readFileSync("./templates/evaluationAct.html", "utf8");

    var options = {
        format: "A4",
        orientation: "portrait",
        border: {
            top: '0mm',
            right: '10mm',
            bottom: '10mm',
            left: '10mm',
        },
        header: {
            height: "45mm",
            contents: "<table style='width: 5.2e+2pt;margin-left:auto;margin-right:auto;margin-bottom: \"20px !important\"'>" +
                "<tbody>" +
                "<tr>" +
                "<td rowspan='3' " +
                "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                "<p " +
                "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                "<img width='76'" +
                "src='data:image/png;base64,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'" +
                "alt='image'></p>" +
                "</td>" +
                "<td colspan='3' " +
                "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                " ORTIZ</span></strong></p>" +
                "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td colspan=\"2\" " +
                " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                "<p " +
                " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                "<strong>ACTA DE EVALUACIÓN DE LA CONFORMIDAD</strong></p>" +
                "</td>" +
                "<td" +
                " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                "<p" +
                " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                "C&oacute;digo:</p>" +
                "<p" +
                " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                "<p" +
                " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                "style=\"font-size:15px;color:red;\">-FV</span></strong><strong><span " +
                "style=\"font-size:15px;color:red;\">-01.01</span></strong></p>" +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td" +
                " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                "<p " +
                "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                "No. Revisi&oacute;n:<strong>&nbsp;02</strong></p>" +
                "</td>" +
                "<td" +
                " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                "<p " +
                "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                "Fecha Vigencia: <strong>31-May-2022</strong>:</p>" +
                "</td>" +
                "<td " +
                "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                "</td>" +
                "</tr>" +
                "</tbody>" +
                "</table>"
        },
        footer: {
            height: "28mm",
            contents:
                "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                "Rev.01 </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>ORO-FV-01.01 " +
                " </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                " </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                "</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                ";font-family:Arial,sans-serif;'></span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                "text-align:center;'><strong><u><span style='font-size:19px;color:red;'></span></u></strong></p><p style='margin:0in;font-size:13px;" +
                "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                "autorizaci&oacute;n del Titular de la UVIE</span> </p>",

        }
    };
    // formatting date
    let date = new Date(evaluationAct.visitDate)

    let data = {
        evaluationAct: evaluationAct.toJSON(),
        technicalFile: technicalFile.toJSON(),
        visitDateDay: date.getUTCDate(),
        visitDateYear: date.getFullYear(),
        visitDateMonth: date.getMonth(),
    }


    let array = []
    array.push(data);

    console.log(data)

    var document = {
        html: html,
        data: {
            data: array,
            noConformities: evaluationAct.noConformities,
            observations: evaluationAct.observations,
            actionsDocumentation: evaluationAct.actionsDocumentation,
        },
        path: "./output.pdf",
        type: "buffer",
    };

    pdf.create(document, options)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            console.error(error);
        });

};

exports.getVerificationListMinorPDF = (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.coreFile, as: 'coreFile' },
            { model: db.verificationList, as: 'verificationList' }
        ]
    }).then(data => {
        var html = fs.readFileSync("./templates/VerificationListMinor.html", "utf8");

        let array = []
        array.push(data.toJSON());

        var options = {
            format: "A4",
            orientation: "landscape",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '0mm',
                left: '10mm',
            },
            header: {
                height: '7cm',
                // contents: "<p style='background-color: red; height: 400px'> ajua</p>"
                contents: "<table style='margin-top:-10px;width: 100%;margin-left:auto;margin-right:auto;'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,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'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>LISTA DE VERIFICACIÓN DE PROYECTO <br/> Menor o Igual a 100 Kw</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FV</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-01.02</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;02</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>31-May-2022</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +

                    "<table style=\"width: 100%;border-collapse:collapse;border:none;\">" +
                    "<tbody>" +
                    "<tr>" +
                    "<td colspan='5' style=\"width:593.35pt;border:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:14.05pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Raz&oacute;n Social: " + array[0].coreFile.socialReason + " </span></p>" +
                    "</td>" +
                    "<td style=\"width: 148.85pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 3.5pt;height: 14.05pt;vertical-align: top;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Fecha: " + array[0].verificationList.date + "</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td style=\"width:49.65pt;border:solid windowtext 1.0pt;border-top:  none;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">NOM&nbsp;</span></p>" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">PEC</span></p>" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Referencia</span></p>" +
                    "</td>" +
                    "<td style=\"width:309.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Texto de Referencia (Requisitos Generales a Verificar)</span></p>" +
                    "</td>" +
                    "<td style=\"width:49.65pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:0in;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:9px;font-family:'Arial',sans-serif;\">Tipo de Verificaci&oacute;n</span></p>" +
                    "</td>" +
                    "<td style=\"width:106.3pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Criterio de Aceptaci&oacute;n o Rechazo</span></p>" +
                    "</td>" +
                    "<td style=\"width:77.95pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Conforme o no conforme</span></p>" +
                    "</td>" +
                    "<td style=\"width: 148.85pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 3.5pt;height: 30.75pt;vertical-align: top;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Observaciones de la verificaci&oacute;n al Proyecto</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents:
                    "<table style=\"width:300.8pt;border-collapse:collapse;border:none;\">" +
                    "<tbody>" +
                    "<tr>" +
                    "<td style=\"width:57.8pt;border:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>A: An&aacute;lisis</span></p>" +
                    "</td>" +
                    "<td style=\"width:63.95pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>D: Documental</span></p>" +
                    "</td>" +
                    "<td style=\"width:44.05pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>O: Ocular</span></p>" +
                    "</td>" +
                    "<td style=\"width:1.0in;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>C: Comprobaci&oacute;n</span></p>" +
                    "</td>" +
                    "<td style=\"width:63.0pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>M: Medici&oacute;n</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +
                    "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                    "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    "Rev.01 </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>ORO-FV-01.01 " +
                    " </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    " </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    "</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                    ";font-family:Arial,sans-serif;'></span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                    "text-align:center;'><strong><u><span style='font-size:19px;color:red;'></span></u></strong></p><p style='margin:0in;font-size:13px;" +
                    "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                    "autorizaci&oacute;n del Titular de la UVIE</span> </p>",

            }
        };




        var document = {
            html: html,
            data: {
                data: array,
            },
            path: "./output.pdf",
            type: "buffer",
        };

        pdf.create(document, options)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
            });
    });


};

exports.getVerificationListMajorPDF = (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.coreFile, as: 'coreFile' },
            { model: db.verificationList, as: 'verificationList' }
        ]
    }).then(data => {
        var html = fs.readFileSync("./templates/VerificationListMajor.html", "utf8");

        let array = []
        array.push(data.toJSON());

        var options = {
            format: "A4",
            orientation: "landscape",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '5mm',
                left: '10mm',
            },
            header: {
                height: '7cm',
                // contents: "<p style='background-color: red; height: 400px'> ajua</p>"
                contents: "<table style='margin-top:-10px;width: 100%;margin-left:auto;margin-right:auto;'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,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'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>LISTA DE VERIFICACIÓN DE PROYECTO <br/> Mayor o Igual a 100 Kw</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FV</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-01.03</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;02</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>31-May-2022</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +

                    "<table style=\"width: 100%;border-collapse:collapse;border:none;\">" +
                    "<tbody>" +
                    "<tr>" +
                    "<td colspan='5' style=\"width:593.35pt;border:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:14.05pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Raz&oacute;n Social: " + array[0].coreFile.socialReason + " </span></p>" +
                    "</td>" +
                    "<td style=\"width: 148.85pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 3.5pt;height: 14.05pt;vertical-align: top;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Fecha: " + array[0].verificationList.date + "</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td style=\"width:49.65pt;border:solid windowtext 1.0pt;border-top:  none;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">NOM&nbsp;</span></p>" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">PEC</span></p>" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Referencia</span></p>" +
                    "</td>" +
                    "<td style=\"width:309.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Texto de Referencia (Requisitos Generales a Verificar)</span></p>" +
                    "</td>" +
                    "<td style=\"width:49.65pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:0in;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:9px;font-family:'Arial',sans-serif;\">Tipo de Verificaci&oacute;n</span></p>" +
                    "</td>" +
                    "<td style=\"width:106.3pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Criterio de Aceptaci&oacute;n o Rechazo</span></p>" +
                    "</td>" +
                    "<td style=\"width:77.95pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Conforme o no conforme</span></p>" +
                    "</td>" +
                    "<td style=\"width: 148.85pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 3.5pt;height: 30.75pt;vertical-align: top;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Observaciones de la verificaci&oacute;n al Proyecto</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents:
                    "<table style=\"width:300.8pt;border-collapse:collapse;border:none;\">" +
                    "<tbody>" +
                    "<tr>" +
                    "<td style=\"width:57.8pt;border:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>A: An&aacute;lisis</span></p>" +
                    "</td>" +
                    "<td style=\"width:63.95pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>D: Documental</span></p>" +
                    "</td>" +
                    "<td style=\"width:44.05pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>O: Ocular</span></p>" +
                    "</td>" +
                    "<td style=\"width:1.0in;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>C: Comprobaci&oacute;n</span></p>" +
                    "</td>" +
                    "<td style=\"width:63.0pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>M: Medici&oacute;n</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +
                    "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                    "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    "Rev.01 </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>ORO-FV-01.01 " +
                    " </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    " </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    "</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                    ";font-family:Arial,sans-serif;'></span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                    "text-align:center;'><strong><u><span style='font-size:19px;color:red;'></span></u></strong></p><p style='margin:0in;font-size:13px;" +
                    "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                    "autorizaci&oacute;n del Titular de la UVIE</span> </p>",

            }
        };




        var document = {
            html: html,
            data: {
                data: array,
            },
            path: "./output.pdf",
            type: "buffer",
        };

        pdf.create(document, options)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
            });
    });
};

exports.getVerificationSiteListPDF = (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.coreFile, as: 'coreFile' },
            { model: db.verificationSiteList, as: 'verificationSiteList' }
        ]
    }).then(data => {
        var html = fs.readFileSync("./templates/VerificationSiteList.html", "utf8");

        let array = []
        array.push(data.toJSON());

        var options = {
            format: "A4",
            orientation: "landscape",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '5mm',
                left: '10mm',
            },
            header: {
                height: '7cm',
                // contents: "<p style='background-color: red; height: 400px'> ajua</p>"
                contents: "<table style='margin-top:-10px;width: 100%;margin-left:auto;margin-right:auto;'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,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'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>LISTA DE VERIFICACIÓN DE LAS INSTALACIONES ELÉCTRICAS -<br/> SITIO</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FV</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-01.04</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;02</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>31-May-2022</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +

                    "<table style=\"width: 100%;border-collapse:collapse;border:none;\">" +
                    "<tbody>" +
                    "<tr>" +
                    "<td colspan='5' style=\"width:593.35pt;border:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:14.05pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Raz&oacute;n Social: " + array[0].coreFile.socialReason + " </span></p>" +
                    "</td>" +
                    "<td style=\"width: 148.85pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 3.5pt;height: 14.05pt;vertical-align: top;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Fecha: " + array[0]?.verificationSiteList?.date + "</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td style=\"width:49.65pt;border:solid windowtext 1.0pt;border-top:  none;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">NOM&nbsp;</span></p>" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">PEC</span></p>" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Referencia</span></p>" +
                    "</td>" +
                    "<td style=\"width:309.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Texto de Referencia (Requisitos Generales a Verificar)</span></p>" +
                    "</td>" +
                    "<td style=\"width:49.65pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:0in;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:9px;font-family:'Arial',sans-serif;\">Tipo de Verificaci&oacute;n</span></p>" +
                    "</td>" +
                    "<td style=\"width:106.3pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Criterio de Aceptaci&oacute;n o Rechazo</span></p>" +
                    "</td>" +
                    "<td style=\"width:77.95pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Conforme o no conforme</span></p>" +
                    "</td>" +
                    "<td style=\"width: 148.85pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 3.5pt;height: 30.75pt;vertical-align: top;\">" +
                    "<p style=\"margin:1.0pt;font-size:16px;font-family:'Times New Roman',serif;text-align:center;\"><span style=\"font-size:11px;font-family:'Arial',sans-serif;\">Observaciones de la verificaci&oacute;n al Proyecto</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents:
                    "<table style=\"width:300.8pt;border-collapse:collapse;border:none;\">" +
                    "<tbody>" +
                    "<tr>" +
                    "<td style=\"width:57.8pt;border:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>A: An&aacute;lisis</span></p>" +
                    "</td>" +
                    "<td style=\"width:63.95pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>D: Documental</span></p>" +
                    "</td>" +
                    "<td style=\"width:44.05pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>O: Ocular</span></p>" +
                    "</td>" +
                    "<td style=\"width:1.0in;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>C: Comprobaci&oacute;n</span></p>" +
                    "</td>" +
                    "<td style=\"width:63.0pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>M: Medici&oacute;n</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +
                    "<p style='float: right;'>* Se asentaran las no conformidades encontradas en sitio </p>" +
                    "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                    "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    "Rev.01 </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>ORO-FV-01.01 " +
                    " </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    " </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    "</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                    ";font-family:Arial,sans-serif;'></span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                    "text-align:center;'><strong><u><span style='font-size:19px;color:red;'></span></u></strong></p><p style='margin:0in;font-size:13px;" +
                    "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                    "autorizaci&oacute;n del Titular de la UVIE</span> </p>",

            }
        };




        var document = {
            html: html,
            data: {
                data: array[0].verificationSiteList.answers,
            },
            path: "./output.pdf",
            type: "buffer",
        };

        pdf.create(document, options)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
            });
    });

};

exports.getVerificationListAnexBPDF = (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.coreFile, as: 'coreFile' },
            { model: db.verificationListAnexB, as: 'verificationListAnexB' }
        ]
    }).then(data => {
        var html = fs.readFileSync("./templates/verificationListAnexB.html", "utf8");

        let array = []
        array.push(data.toJSON());

        var options = {
            format: "A4",
            orientation: "landscape",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '5mm',
                left: '10mm',
            },
            header: {
                height: '7cm',
                // contents: "<p style='background-color: red; height: 400px'> ajua</p>"
                contents: "<table style='margin-top:-10px;width: 100%;margin-left:auto;margin-right:auto;'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,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'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>LISTA DE VERIFICACIÓN DE LAS INSTALACIONES ELÉCTRICAS -<br/> ANEXO B</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FV</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-01.05</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;01</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>31-May-2022</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +
                    "<table style=\"width: 100%;border-collapse:collapse;border:none;\">" +
                    "<tbody>" +
                    "<tr>" +
                    "<td colspan=\"2\" style=\"width:364.85pt;border:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:14.05pt;\">" +
                    "<p style='margin:1.0pt;font-size:16px;font-family:\"Times New Roman\",serif;'><span style='font-size:11px;font-family:\"Arial\",sans-serif;'>Raz&oacute;n Social:</span></p>" +
                    "</td>" +
                    "<td colspan=\"3\" style=\"width:177.2pt;border:solid windowtext 1.0pt;border-left:none;padding:0in 3.5pt 0in 3.5pt;height:14.05pt;\">" +
                    "<p style='margin:1.0pt;font-size:16px;font-family:\"Times New Roman\",serif;'><span style='font-size:11px;font-family:\"Arial\",sans-serif;'>&nbsp;</span></p>" +
                    "</td>" +
                    "<td colspan=\"2\" style=\"width:191.5pt;border:solid windowtext 1.0pt;border-left:none;padding:0in 3.5pt 0in 3.5pt;height:14.05pt;\">" +
                    "<p style='margin:1.0pt;font-size:16px;font-family:\"Times New Roman\",serif;'><span style='font-size:11px;font-family:\"Arial\",sans-serif;'>Fecha:</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td style=\"width:73.65pt;border:solid windowtext 1.0pt;border-top:  none;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style='margin:1.0pt;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Arial\",sans-serif;'>NOM</span></p>" +
                    "<p style='margin:1.0pt;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Arial\",sans-serif;'>PEC</span></p>" +
                    "<p style='margin:1.0pt;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Arial\",sans-serif;'>Referencia</span></p>" +
                    "</td>" +
                    "<td colspan=\"2\" style=\"width:150.45pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style='margin:1.0pt;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Arial\",sans-serif;'>Texto de Referencia (Requisitos Generales a Verificar)</span></p>" +
                    "</td>" +
                    "<td style=\"width:70.6pt;border-top:none;border-left:none;border-bottom:  solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:9px;font-family:\"Arial\",sans-serif;'>Tipo de Verificaci&oacute;n</span></p>" +
                    "</td>" +
                    "<td colspan=\"2\" style=\"width:134.7pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style='margin:1.0pt;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Arial\",sans-serif;'>Criterio de Aceptaci&oacute;n o Rechazo</span></p>" +
                    "</td>" +
                    "<td style=\"width:163.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:30.75pt;\">" +
                    "<p style='margin:1.0pt;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Arial\",sans-serif;'>Observaciones de la verificaci&oacute;n IE en sitio</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents:
                    "<table style=\"width:300.8pt;border-collapse:collapse;border:none;\">" +
                    "<tbody>" +
                    "<tr>" +
                    "<td style=\"width:57.8pt;border:solid windowtext 1.0pt;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>A: An&aacute;lisis</span></p>" +
                    "</td>" +
                    "<td style=\"width:63.95pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>D: Documental</span></p>" +
                    "</td>" +
                    "<td style=\"width:44.05pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>O: Ocular</span></p>" +
                    "</td>" +
                    "<td style=\"width:1.0in;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>C: Comprobaci&oacute;n</span></p>" +
                    "</td>" +
                    "<td style=\"width:63.0pt;border:solid windowtext 1.0pt;border-left:  none;padding:0in 3.5pt 0in 3.5pt;height:8.25pt;\">" +
                    "<p style='margin:0in;font-size:16px;font-family:\"Times New Roman\",serif;text-align:center;'><span style='font-size:11px;font-family:\"Trebuchet MS\",sans-serif;'>M: Medici&oacute;n</span></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +
                    "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                    "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    "Rev.01 </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>ORO-FV-01.01 " +
                    " </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    " </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    "</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                    ";font-family:Arial,sans-serif;'></span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                    "text-align:center;'><strong><u><span style='font-size:19px;color:red;'></span></u></strong></p><p style='margin:0in;font-size:13px;" +
                    "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                    "autorizaci&oacute;n del Titular de la UVIE</span> </p>",

            }
        };




        var document = {
            html: html,
            data: {
                // data: array[0].verificationSiteList.answers,
                data: array,
            },
            path: "./output.pdf",
            type: "buffer",
        };

        pdf.create(document, options)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
            });
    });

};

exports.getTestComprobationPDF = (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.testComprobation, as: 'testComprobation' },
            { model: db.coreFile, as: 'coreFile' },
        ]
    }).then(data => {
        var html = fs.readFileSync("./templates/testComprobation.html", "utf8");

        var options = {
            format: "A4",
            orientation: "portrait",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm',
            },
            header: {
                height: "45mm",
                contents: "<table style='width: 5.2e+2pt;margin-left:auto;margin-right:auto;margin-bottom: \"20px !important\"'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,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'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>PRUEBAS Y COMPROBACIONES A<br/> INSTALACIONES ELÉCTRICAS</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FC</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-01.06</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;01</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>15-Jun-2019</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents:
                    "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                    "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    "</span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    " </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    " </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    "</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                    ";font-family:Arial,sans-serif;'></span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                    "text-align:center;'><strong><u><span style='font-size:19px;color:red;'>ORIGINAL</span></u></strong></p><p style='margin:0in;font-size:13px;" +
                    "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                    "autorizaci&oacute;n del Titular de la UVIE</span> </p> <p style=\"font-family: Calibri; font-size: 10px\"> <span> Rev. 01</span> <span style=\"float: right;\"> ORO-FV-01.05</span> </p>",

            }
        };

        let array = []
        array.push(data.toJSON());

        var document = {
            html: html,
            data: {
                data: array,
            },
            path: "./output.pdf",
            type: "buffer",
        };

        pdf.create(document, options)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
            });

    });
};

exports.getDictumPDF = (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.dictum, as: 'dictum' },
            { model: db.serviceRequest, as: 'serviceRequest' },
            { model: db.coreFile, as: 'coreFile' },
        ]
    }).then(data => {
        var html = fs.readFileSync("./templates/dictum.html", "utf8");

        var options = {
            format: "A4",
            orientation: "portrait",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm',
            },
            header: {
                height: "45mm",
                contents: "<table style='width: 5.2e+2pt;margin-left:auto;margin-right:auto;margin-bottom: \"20px !important\"'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,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'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>DICTAMEN DE VERIFICACIÓN DE INSTALACIONES<br/> ELÉCTRICAS (NOM-001-SEDE-2012)</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FC</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-01.07</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;01</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>15-Jun-2019</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents:
                    "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                    "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    "</span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    " </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    " </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    "</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                    ";font-family:Arial,sans-serif;'></span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                    "text-align:center;'><strong><u><span style='font-size:19px;color:red;'>ORIGINAL</span></u></strong></p><p style='margin:0in;font-size:13px;" +
                    "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                    "autorizaci&oacute;n del Titular de la UVIE</span> </p> <p style=\"font-family: Calibri; font-size: 10px\"> <span> Rev. 00</span> <span style=\"float: right;\"> ORO-FV-01.07</span> </p>",

            }
        };

        let array = []
        array.push(data.toJSON());

        var document = {
            html: html,
            data: {
                data: array,
            },
            path: "./output.pdf",
            type: "buffer",
        };

        pdf.create(document, options)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
            });

    });
};
exports.getDictumCoverPDF = (req, res) => {
    let id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.dictum, as: 'dictum' },
            { model: db.dictumCover, as: 'dictumCover' },
            { model: db.serviceRequest, as: 'serviceRequest' },
            { model: db.coreFile, as: 'coreFile' },
        ]
    }).then(data => {
        var html = fs.readFileSync("./templates/dictumCover.html", "utf8");

        var options = {
            format: "A4",
            orientation: "portrait",
            border: {
                top: '0mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm',
            },
            header: {
                height: "45mm",
                contents: "<table style='width: 5.2e+2pt;margin-left:auto;margin-right:auto;margin-bottom: \"20px !important\"'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='3' " +
                    "style='width: 111.75pt;border: 1pt solid windowtext;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:Arial,sans-serif;margin-top:1.75pt;margin-right:-5.4pt;margin-bottom:.0001pt;margin-left:-7.1pt;text-align:center;'>" +
                    "<img width='76'" +
                    "src='data:image/png;base64,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'" +
                    "alt='image'></p>" +
                    "</td>" +
                    "<td colspan='3' " +
                    "style='width: 405.65pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;padding: 0in 5.4pt;height: 20.5pt;vertical-align: top;'>" +
                    "<p style='margin:0in;font-size:13px;font-family:'Arial',sans-serif;text-align:center;'><strong><span " +
                    " style='font-size:5px;'>&nbsp;</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;'><strong><span" +
                    " style='font-size:15px;font-family:\"Century Gothic\",sans-serif;'>ING. JESUS OMAR RICARDEZ" +
                    " ORTIZ</span></strong></p>" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;text-align:center;text-indent:-.65pt;'>" +
                    "Unidad de Verificaci&oacute;n De Instalaciones El&eacute;ctricas</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td colspan=\"2\" " +
                    " style=\"width:311.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:33.8pt;\">" +
                    "<p " +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:2.0pt;text-align:center;'>" +
                    "<strong>FORMATO DE PORTADA DE DICTAMEN DE<br/>VERIFICACIÓN DE INSTALACIONES ELÉCTRICAS</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width: 93.8pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0in 5.4pt;height: 33.8pt;vertical-align: top;\">" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "C&oacute;digo:</p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:5px;color:red;\">&nbsp;</span></strong></p>" +
                    "<p" +
                    " style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:1.7pt;margin-bottom:.0001pt;margin-left:3.3pt;text-indent:-3.95pt;'>" +
                    "<strong><span style=\"font-size:15px;color:red;\">ORO</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-FC</span></strong><strong><span " +
                    "style=\"font-size:15px;color:red;\">-01.08</span></strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td" +
                    " style=\"width:141.7pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-8.7pt;'>" +
                    "No. Revisi&oacute;n:<strong>&nbsp;01</strong></p>" +
                    "</td>" +
                    "<td" +
                    " style=\"width:170.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p " +
                    "style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:1.75pt;margin-right:0in;margin-bottom:.0001pt;margin-left:3.3pt;text-align:center;text-indent:-3.95pt;'>" +
                    "Fecha Vigencia: <strong>15-Jun-2019</strong>:</p>" +
                    "</td>" +
                    "<td " +
                    "style=\"width:93.8pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.65pt;\">" +
                    "<p style='margin:0in;font-size:13px;font-family:\"Arial\",sans-serif;margin-top:6.0pt;'>" +
                    "P&aacute;gina:<strong>&nbsp;</strong><strong>{{page}}</strong><strong>&nbsp;de&nbsp;</strong><strong>{{pages}}</strong></p>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
            },
            footer: {
                height: "28mm",
                contents:
                    "<p style=\"text-align: center; font-family:Arial\">P&aacute;gina {{page}} de {{pages}} </p>" +
                    "<div style='margin: 0in; font-family: Arial, sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    "</span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    " </span></div><br/><div style='margin:0in;font-family:Arial,sans-serif;'><span style='font-size:11px; float:left !important;'>" +
                    " </span><span style='font-size:11px;font-family:Arial,sans-serif; float:right !important;'>" +
                    "</span></div><br/><p style='margin: 0in; font-size: 13px; font-family: Arial, sans-serif; text-align: right;'><span style='font-size:11px" +
                    ";font-family:Arial,sans-serif;'></span></p><p style='margin:0in;font-size:13px;font-family:Arial,sans-serif;" +
                    "text-align:center;'><strong><u><span style='font-size:19px;color:red;'>ORIGINAL</span></u></strong></p><p style='margin:0in;font-size:13px;" +
                    "font-family:Arial,sans-serif;'><span style='font-size:11px;'>Documento controlado, prohibida su reproducci&oacute;n parcial o total sin " +
                    "autorizaci&oacute;n del Titular de la UVIE</span> </p> <p style=\"font-family: Calibri; font-size: 10px\"> <span> Rev. 00</span> <span style=\"float: right;\"> ORO-FV-01.08</span> </p>",

            }
        };

        let array = []
        array.push(data.toJSON());

        var document = {
            html: html,
            data: {
                data: array,
            },
            path: "./output.pdf",
            type: "buffer",
        };

        pdf.create(document, options)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
            });

    });
};