import { useTranslation } from "react-i18next"
import { Wrapper } from "./style"
import defaultImage from "assets/images/staff_default.png"
import { useFetchCategories } from "../../screens/UpdateCoupon/useFetchCategories"
import { useState } from "react";
import { useAppSelector } from "services/redux/hooks";
import { Stats } from "../CouponCard/style";
interface TabletCardProps {
    image: string,
    type: number;
    title: string;
    description: string;
    price: number;
    value: number;
    ageFrom: number;
    count: number;
    categoryIds: number[];
    onClick: (arg: any) => void;
    isSelected: boolean;
    startDate?: string;
    endDate?: string;
    publishDate?: string;
    stats?: any;
}
export const TabletCard: React.FC<TabletCardProps> = ({ onClick, isSelected, image, type, price, ageFrom, title, description, value, count, categoryIds, stats }) => {
    const isCoupon = type === 2
    const { t } = useTranslation()
    const [categories, setCategories] = useState<any>();
    const _ = useFetchCategories(setCategories, categoryIds);

    const getPercentage = (total: number, value: number) => {
        if (value === 0) return 0;
        const res = (value * 100) / total;
        return res % 1 === 0 ? res : res.toFixed(1);
    };


    return (
        <Wrapper onClick={onClick} isActive={isSelected}>
            <div className="image">
                <img
                    src={image}
                    alt="couponImage"
                    onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage
                    }} />
                <span>{isCoupon ? t("coupon") : t("certificate")}</span>
            </div>
            <div className="content">
                <h5>{title}</h5>
                <p className="description">
                    {description.length > 35
                        ? description.slice(0, 35) + "..."
                        : description}
                </p>
                <span>
                    {isCoupon ? t("coupon_value") : t("certificate_value")}: {value}{" "}{isCoupon ? "%" : "Сум"}
                </span>
                <span>
                    {isCoupon ? t("coupon_amount") : t("certificate_amount")}: {count} шт
                </span>
                <span>
                    {isCoupon ? t("coupon_price") : t("certificate_price")}: {price} Сум
                </span>
                <span>{t("ageLimit")}: {ageFrom || "Нет"}</span>
                <div className="categories">
                    {t("categories")}:{" "}
                    {categories?.defaults?.map((el: any, index: number) => (
                        <b>
                            {el.label}
                            {index < categories?.defaults?.length - 1 ? ", " : "."}
                        </b>
                    ))}
                </div>
                {stats &&
                    <>
                        <h1 className="statsTitle">{t("statistics")}</h1>
                        <Stats>
                            <p className="first">
                                Купили: {count - stats.total} (
                                {getPercentage(count, count - stats.total)}%)
                            </p>
                            <p className="second">
                                Использовали: {stats.used} (
                                {getPercentage(count - stats.total, stats.used)}%)
                            </p>
                            <p className="third">
                                Просрочено: {stats.expired} ({getPercentage(count, stats.expired)}%)
                            </p>
                            <p className="fourth">
                                Не продано: {stats.total} ({getPercentage(count, stats.total)}%)
                            </p>
                        </Stats>
                    </>
                }
            </div>
        </Wrapper>
    )
}
