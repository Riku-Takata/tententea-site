import Icon from "../public/tenten_logo.svg";
export const LoadingLogoView = () => {
    return (
        <div className='flex justify-start font-bold text-2xl sm:flex-1 md:flex-1 lg:flex-1 xl:flex-1'>
            <Icon
                width={100}
                height={100}
            />
        </div>
    );
};