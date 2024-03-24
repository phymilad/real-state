const e2p = (s: string) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const p2e = (s: string) => {
  return s
    .replace(/[\u0660-\u0669]/g, (c: string) => {
      return (c.charCodeAt(0) - 0x0660).toString();
    })
    .replace(/[\u06f0-\u06f9]/g, (c: string) => {
      return (c.charCodeAt(0) - 0x06f0).toString();
    });
}

const sp = (number: number) => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber?.join(",");
  if(joinedNumber) {
    return e2p(joinedNumber);
  }
};

export { e2p, p2e, sp };
