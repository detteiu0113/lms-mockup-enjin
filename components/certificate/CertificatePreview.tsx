// components/certificate/CertificatePreview.tsx

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
    <div className="bg-white border border-border-default shadow-sm print:shadow-none aspect-[1.414/1] max-w-4xl mx-auto flex flex-col relative overflow-hidden">
      {/* トップバー */}
      <div className="h-1 bg-brand w-full" />

      <div className="px-16 py-12 flex-1 flex flex-col">
        <div className="text-center">
          <div className="text-[10px] tracking-[0.4em] text-text-secondary mb-2">CERTIFICATE OF COMPLETION</div>
          <h1 className="text-3xl font-semibold text-text tracking-tight mb-2">修了証</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-2xl mx-auto">
          <div className="text-xs text-text-secondary mb-1">所属 {companyName}</div>
          <div className="text-2xl font-semibold text-text mb-8">{learnerName} 殿</div>

          <p className="text-sm leading-loose text-text-secondary mb-8">
            貴殿は下記の研修コースを修了されましたので、これを証します。
          </p>

          <div className="px-6 py-3 border-y border-border-default">
            <div className="text-[10px] text-text-muted mb-1 tracking-wide">COURSE</div>
            <div className="text-lg font-semibold text-text">{courseTitle}</div>
          </div>

          <div className="mt-6 text-xs text-text-secondary">
            修了日: <span className="font-medium text-text tabular-nums">{issuedDate}</span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-6 border-t border-border-default">
          <div>
            <div className="text-[10px] text-text-muted tracking-wide">NO.</div>
            <div className="text-[11px] font-mono text-text-secondary">{certificateNo}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-text-muted mb-0.5 tracking-wide">ISSUED BY</div>
            <div className="text-sm font-medium text-text">合同会社えん人</div>
            <div className="text-[11px] text-text-secondary">代表 押田 裕亮</div>
          </div>
        </div>
      </div>
    </div>
  );
}
