const form = document.querySelector("#grade-form");
const year = document.querySelector("#year");
const weight = document.querySelector("#weight");
const error = document.querySelector("#error");
const averageOutput = document.querySelector("#average");
const gradeOutput = document.querySelector("#grade");
const note = document.querySelector("#note");

function setWeight() {
  const yearNumber = Number(year.value);
  weight.textContent = `${year.options[year.selectedIndex].text} · Học kỳ II hệ số ${yearNumber + 1}`;
}

year.addEventListener("change", setWeight);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstInput = form.querySelector("#semester-one");
  const secondInput = form.querySelector("#semester-two");
  const inputs = [firstInput, secondInput];
  const invalid = inputs.find((input) => input.value === "" || !Number.isFinite(Number(input.value)) || Number(input.value) < 0 || Number(input.value) > 10);
  if (invalid) {
    error.textContent = "Nhập đủ hai điểm hợp lệ trong khoảng từ 0 đến 10.";
    invalid.focus();
    return;
  }

  const firstWeight = Number(year.value);
  const secondWeight = firstWeight + 1;
  const result = (Number(firstInput.value) * firstWeight + Number(secondInput.value) * secondWeight) / (firstWeight + secondWeight);
  const label = result >= 9 ? "Giỏi" : result >= 7 ? "Khá" : result >= 5 ? "Trung bình" : "Cần cố gắng";
  averageOutput.innerHTML = `${result.toFixed(1).replace(".", ",")}<small>/10</small>`;
  gradeOutput.textContent = `Xếp loại ${label}`;
  note.textContent = `Điểm đã được tính với hệ số ${firstWeight} cho học kỳ I và ${secondWeight} cho học kỳ II.`;
  error.textContent = "";
});

form.addEventListener("reset", () => {
  error.textContent = "";
  averageOutput.innerHTML = "--<small>/10</small>";
  gradeOutput.textContent = "Chưa có kết quả";
  note.textContent = "Kết quả sẽ xuất hiện sau khi nhập đủ điểm.";
  setTimeout(setWeight, 0);
});

setWeight();