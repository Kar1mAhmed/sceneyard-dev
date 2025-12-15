import Image from "next/image";
import SelectionBox from "../SelectionBox";

export default function SkillValueSection() {
    const borderColorClass = 'bg-primary-70/30'; // Replacing inline style with class
    const borderClass = 'border-primary-70/30';

    return (
        <div className="w-full relative my-32 flex flex-col gap-16">
            {/* 
               Shared Typography Styles 
               These are applied inline to match specific user request perfectly 
            */}


            {/* BLOCK 1: Purple Background, Text Left, Image Right */}
            {/* 
                Containers constrained to 90% width to match GridBackground lines (left 5%, right 5%).
                Height: 560px on desktop.
                Padding: 72px top/bottom, 96px left/right.
            */}
            <div className="w-full relative">
                {/* Full Width Lines */}
                <div className={`absolute top-0 left-0 right-0 h-[1px] ${borderColorClass}`} />
                <div className={`absolute bottom-0 left-0 right-0 h-[1px] ${borderColorClass}`} />

                {/* Content Container (90% Width) */}
                {/* Content Container (Dynamic Width based on Grid Lines) */}
                <div
                    className={`relative bg-primary-60 border-primary-70/30 border-none min-h-[560px] flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:px-[96px] lg:py-[72px] mx-auto`}
                    style={{
                        width: 'calc(100% - (var(--grid-margin) * 2))',
                        maxWidth: '1596px'
                    }}
                >
                    {/* Text Content */}
                    <div className="flex flex-col gap-6 text-white z-10 w-full lg:w-auto text-center lg:text-left items-center lg:items-start">
                        <h2 style={bigTextStyle} className="text-4xl md:text-6xl lg:text-[82px] whitespace-pre-wrap">
                            We're not <br />
                            <span className="inline-block relative">
                                <SelectionBox
                                    text="Replacing"
                                    color="var(--color-primary-90)"
                                    className="!bg-transparent"
                                />
                            </span> <br />
                            your skills
                        </h2>
                        {/* 
                            Small text max-width constrained.
                        */}
                        <p style={smallTextStyle} className="opacity-90 max-w-[80%] lg:max-w-[400px] text-center lg:text-left">
                            We're giving you back your time
                        </p>
                    </div>

                    {/* Image Right */}
                    <div className="relative w-full lg:w-[45%] h-[300px] lg:h-full flex items-center justify-center lg:justify-end">
                        <Image
                            src="/assets/AF2.svg"
                            alt="After Effects UI"
                            width={600}
                            height={400}
                            className="object-contain max-h-full w-auto"
                        />
                    </div>
                </div>
            </div>

            {/* BLOCK 2: Transparent, Image Left, Text Right */}
            <div className="w-full relative">
                {/* Full Width Lines */}
                <div className={`absolute top-0 left-0 right-0 h-[1px] ${borderColorClass}`} />
                <div className={`absolute bottom-0 left-0 right-0 h-[1px] ${borderColorClass}`} />

                {/* Content Container (Dynamic Width based on Grid Lines) */}
                <div
                    className={`relative border-primary-70/30 border-none min-h-[560px] flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-12 lg:px-[96px] lg:py-[72px] mx-auto`}
                    style={{
                        width: 'calc(100% - (var(--grid-margin) * 2))',
                        maxWidth: '1596px'
                    }}
                >
                    {/* Image Left */}
                    <div className="relative w-full lg:w-[45%] h-[300px] lg:h-full flex items-center justify-center lg:justify-start">
                        <Image
                            src="/assets/AF1.svg"
                            alt="Project folder structure"
                            width={600}
                            height={400}
                            className="object-contain max-h-full w-auto"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col gap-6 text-white z-10 w-full lg:w-auto flex items-center lg:items-end text-center lg:text-right">
                        <h2 style={bigTextStyle} className="text-4xl md:text-6xl lg:text-[82px] whitespace-pre-wrap">
                            Skip the <br />
                            <span className="inline-block relative">
                                <SelectionBox
                                    text="Repetitive"
                                    color="var(--color-primary-95)"
                                />
                            </span> <br />
                            building.
                        </h2>
                        {/* Centered relative to current flex alignment (right) but with text-center for the text itself? 
                            "small text should be centred" might mean centered TEXT ALIGMENT.
                            Also constrained width.
                         */}
                        <p style={smallTextStyle} className="opacity-90 max-w-[80%] lg:max-w-[400px] text-center lg:text-right">
                            Focus on the creative work that actually makes you money.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper object for inline styles (since we can't define variables outside component or inside return easily in TSX without clean separation)
const bigTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-poppins)',
    fontWeight: 600,
    fontStyle: 'normal',
    // We use responsive classes for size, but keep this for reference/desktop
    // fontSize: '82px', 
    lineHeight: '120%',
    letterSpacing: '-1.12px',
};

const smallTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-geist-mono)',
    fontWeight: 400,
    fontStyle: 'normal',
    // fontSize: '24px',
    lineHeight: '120%',
    letterSpacing: '0.6px',
};
