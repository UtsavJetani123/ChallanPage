import { useEffect, useRef, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";
import { RotatingLines } from "react-loader-spinner";
// import { useReactToPrint } from "react-to-print";

function App() {
  const padref = useRef()
  const [FileName , setFileName] = useState("")
  const [Loader , setLoader] = useState(false)

  const tdStyle = "border-2 border-t-0 border-r-0 border-black"

  useEffect(()=>{
    const inputs = document.querySelectorAll(".otp-field input");

    inputs.forEach((input, index) => {
        input.dataset.index = index;
        input.addEventListener("keyup", handleOtp);
        input.addEventListener("paste", handleOnPasteOtp);
    });
    
    function handleOtp(e) {
      const input = e.target;
      let value = input.value;
      let isValidInput = value.match(/[0-9a-z]/gi);
      input.value = "";
      input.value = isValidInput ? value[0].toUpperCase() : "";

      let fieldIndex = input.dataset.index;
      if (fieldIndex < inputs.length - 1 && isValidInput) {
        input.nextElementSibling.focus();
      }

      if (e.key === "Backspace" && fieldIndex > 0) {
          input.previousElementSibling.focus();
      }
    }
    
    function handleOnPasteOtp(e) {
      const data = e.clipboardData.getData("text");
      const value = data.split("");
      if (value.length === inputs.length) {
          inputs.forEach((input, index) => (input.value = value[index]));
      }
    }
  },[])

  const dowloadPDF = () => {
    if (FileName !== "") {
      setLoader(true)
      const input = padref.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        pdf.addImage(imgData,"PNG",imgX,imgY,imgWidth * ratio,imgHeight * ratio
        );
        pdf.save(`${FileName}.pdf`);
        setLoader(false)
      });
      CloseModel()
    }else{
      alert("please Enter File Name")
    }
  };

  function HandleFileName(e){
      setFileName(e.target.value);
  }

  function OpenModel(){
    document.getElementById("Model").style.opacity = 1
  }

  function CloseModel(){
    document.getElementById("Model").style.opacity = 0
    setFileName("")
  }

  return (
    <>
    <div className="absolute top-[50%] left-[80%] h-[200px]">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="80"
        visible={Loader}
      />
    </div>
      <div className="w-full h-full" ref={padref}>
        <div className="Containar w-[600px] h-full border-2 p-2 border-black">
          {/* First Row */}
          <div className="flex">
            <div className="border-2 border-black m-[1px] p-1 w-full h-full grid gap-2">
              <label className="font-medium text-sm h-5">Form</label>
              <label className="flex justify-center font-bold text-3xl">TILAK  FABRICS</label>
              <div className="flex gap-1 font-semibold text-lg pl-2">
                <label>GST</label>
                <label>:</label>
                <label>24ALEPD1281D1ZS</label>
              </div>
            </div>
            <div className="border-2 border-black m-[1px] p-1 w-full h-full grid gap-5 py-[15.5px]">
              <div className="flex gap-2">
                <label className="w-11">No.</label>
                <input type="text" className="w-full h-7 items-center font-medium border-b-2 border-black outline-none" inputMode="numeric" />
              </div>
              <div className="flex gap-2">
                <label className="w-11">Date.</label>
                <input type="date" className="w-full h-7 items-center font-medium border-b-2 border-black outline-none bg-transparent" />
              </div>
            </div>
          </div>
          {/* Seconde Row */}
          <div className="flex">
            <div className="border-2 border-black m-[1px] p-1 w-full h-full grid gap-1">
              <div className="gap-1">
                <label className="font-medium text-sm">To.</label>
                <div className="border-b-2 border-black">
                  <input className="w-[210px] h-8 items-center outline-none text-left font-medium text-sm" />
                </div>
              </div>
              <div className="grid gap-1">
                <label className="font-medium text-sm">GST No.</label>
                <div className="otp-field flex gap-[2px]">
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-bold text-sm border-b-[1px] border-black focus:outline-none" maxlength="1" />
                </div>
              </div>
            </div>
            <div className="border-2 border-black m-[1px] p-1 w-full h-full grid gap-8 py-[17px]">
            <div className="flex gap-5">
              <label className="w-11">P.O.No.</label>
              <input type="text" className="w-full h-7 items-center font-medium border-b-2 border-black outline-none" inputMode="numeric" />
            </div>
            <div className="flex gap-2">
              <label className="w-11">Date.</label>
              <input type="date" className="w-full h-7 items-center font-medium border-b-2 border-black outline-none bg-transparent" />
            </div>
            </div>
          </div>
          <label className="font-medium text-sm flex justify-center py-2">Please receive the undermentioned goods in good order and condition</label>
          <table id="table" className="border-2">
            <tr>
              <th className={tdStyle}><input className="w-[210px] h-8 text-center font-semibold text-base items-center" value="DISCRIPTION" readonly="readonly" /></th>
              <th className={tdStyle}><input className="w-[120px] h-8 text-center font-semibold text-base items-center" value="QUANTITY" readonly="readonly" /></th>
              <th className={tdStyle}><input className="w-[120px] h-8 text-center font-semibold text-base items-center" value="RATE" readonly="readonly" /></th>
              <th className={tdStyle}><input className="w-[120px] h-8 text-center font-semibold text-base items-center" value="AMOUNT" readonly="readonly" /></th>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center font-medium h-8 items-center text-sm" /></td>
            </tr>
            <tr>
              <td className={tdStyle}><input className="w-[210px] outline-none  h-8 items-center text-center font-medium text-sm" maxLength={20} readonly="readonly" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none  h-8 items-center text-center font-medium text-sm" maxLength={12} readonly="readonly" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none  h-8 items-center text-center font-medium text-sm" maxLength={12} readonly="readonly" /></td>
              <td className={tdStyle}><input className="w-[120px] outline-none text-center h-8 items-center  font-medium text-sm" maxLength={12} readonly="readonly" /></td>
            </tr>
          </table>
        </div>
      </div>
      <div className="w-[600px] my-2 flex justify-between">
        <div className="w-full px-2" onClick={OpenModel}>
          <button className="border-2 bg-black text-white border-black h-16 w-full rounded-md text-xl cursor-pointer">Pdf Dowload</button>
        </div>
        {/* <div className="border-2 border-black h-12 w-44 p-1 mr-1 cursor-pointer rounded-md" onClick={AddRow}>
          <FaPlus className="text-lg text-center h-7 w-44 items-center mt-1" />
        </div> */}
      </div>
      <div id="Model" className="absolute top-[50%] left-[40%] w-[350px] h-[200px] bg-white shadow-2xl shadow-white-500 opacity-0">
        <label className="text-2xl font-bold flex justify-center mt-5">Save File</label>
        <div className="flex justify-center items-center">
          <input className="flex justify-center border-2 border-black text-black h-10 rounded-lg pl-2 mt-5 outline-none" value={FileName} placeholder="Entre File Name" onChange={HandleFileName} />
        </div>
        <div className="flex justify-center items-center gap-5">
          <button className="w-32 h-10 bg-blue-500 mt-5 rounded-lg text-lg text-white font-semibold" onClick={dowloadPDF}>Dowload</button>
          <button className="w-32 h-10 bg-black mt-5 rounded-lg text-white text-lg font-semibold" onClick={CloseModel}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default App;
