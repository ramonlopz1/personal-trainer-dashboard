import Image from "next/image";

export default function Loading() {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={{ ...style }}>
      <Image src="/loading.gif" alt="Loading" height={200} width={200} />
    </div>
  );
}
