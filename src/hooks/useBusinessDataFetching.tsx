import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../app/store";
import { fetchBusinessDetails } from "../freatuers/business/businessSlice";

export const useBusinessDataFetching = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const businessDetails = useSelector((state: RootState) => state.business.businessDetails);
    const businessFetching = useSelector((state: RootState) => state.business.businessFetching);

    useEffect(() => {
        if (userId && (!businessDetails || businessDetails.length === 0) && businessFetching !== 'pending') {
            dispatch(fetchBusinessDetails(userId));
        }
    }, []);
};