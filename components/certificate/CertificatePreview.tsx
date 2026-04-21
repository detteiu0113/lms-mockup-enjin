// components/certificate/CertificatePreview.tsx
// PDF風の修了証プレビュー（HTMLで再現）

interface Props {
  learnerName: string;
  companyName: string;
  courseTitle: string;
  issuedDate: string;
  certificateNo: string;
}

export default function CertificatePreview({
  learnerName,
  companyName,
  courseTitle,
  issuedDate,
  certificateNo,
}: Props) {
  return (
    <div className="bg-white border-[12px] border-double border-brand p-12 shadow-lg print:shadow-none aspect-[1.414/1] max-w-4xl mx-auto flex flex-col">
      <div className="text-center flex-1 flex flex-col justify-center">
        <div className="text-sm tracking-[0.4em] text-text-secondary mb-2">CERTIFICATE OF COMPLETION</div>
        <h1 className="text-4xl font-bold text-brand mb-10 tracking-widest">修 了 証</h1>

        <div className="text-sm text-text-secondary mb-2">所属 {companyName}</div>
        <div className="text-3xl font-bold text-text mb-10 tracking-wider">{learnerName} 殿</div>

        <div className="max-w-xl mx-auto text-base leading-loose text-text">
          貴殿は、当社が提供する下記の研修コースを修了されましたので、これを証します。
        </div>

        <div className="my-8 inline-block mx-auto px-8 py-4 border-y border-text-secondary">
          <div className="text-xs text-text-secondary mb-1">研修コース名</div>
          <div className="text-xl font-bold text-text">{courseTitle}</div>
        </div>

        <div className="text-sm text-text-secondary">
          修了日: <span className="font-medium text-text">{issuedDate}</span>
        </div>
      </div>

      <div className="flex items-end justify-between mt-auto pt-8 border-t border-border-default">
        <div className="text-left">
          <div className="text-xs text-text-muted">修了証番号</div>
          <div className="text-xs font-mono text-text">{certificateNo}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-text-secondary mb-1">発行</div>
          <div className="text-base font-bold text-text">合同会社えん人</div>
          <div className="text-xs text-text-secondary">代表 押田 裕亮</div>
        </div>
      </div>
    </div>
  );
}
