// 상태에 따라 라벨 색상 결정
const getColorByStatus = (approvalStatus) => {
  switch (approvalStatus) {
    case "승인":
      return "purple";
    case "반려":
      return "red";
    default:
      return "gray"; // 기본 색상
  }
};

export default getColorByStatus