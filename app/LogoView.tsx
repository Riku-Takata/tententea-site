import Icon from "../public/tenten_logo.svg";
export const LogoView = () => {
    return (
        <div className='flex justify-start font-bold text-2xl sm:flex-1 md:flex-1 lg:flex-1 xl:flex-1'>
            <Icon
                width={45}
                height={45}
            />
            <h1 className="px-2 py-1">Ten Ten Tea</h1>
        </div>
    );
};