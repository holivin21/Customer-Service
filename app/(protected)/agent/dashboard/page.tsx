"use client"

import { Box, Grid, Stack, Typography } from "@mui/material"
import { HttpError, useList } from "@refinedev/core";
import Image from "next/image";
import { IMasterCase, MasterCaseStatus } from "src/interfaces";
import TotalCaseImage from "public/images/total_case.svg";
import WorkIcon from '@mui/icons-material/Work';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import { useEffect } from "react";
import { getDayMonth } from "src/utility/datetimeFormat";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Page() {
    const { data, isLoading } = useList<IMasterCase, HttpError>({
        resource: "MasterCase",
        pagination: {
            mode: "off",
        },
        meta: {
            select: "id,status,start_time,end_time"
        },
        filters: [
            {
                field: "is_deleted",
                operator: "eq",
                value: false
            }
        ],
        sorters: [
            {
                field: "start_time",
                order: "asc"
            }
        ]
    })
    return (
        <>
            <Grid container height="100%" direction="column" gap={2} >
                <Grid item container gap={2} xs={2}>
                    <Grid item xs boxShadow={6} borderRadius={4} p={1} >
                        <Stack direction="row" alignItems="center" justifyContent="space-evenly" >
                            <Box boxShadow={2} borderRadius={100}>
                                <WorkIcon sx={{ fontSize: 80 }} color="primary" />
                            </Box>
                            <Box>
                                <Typography variant="h5">Total Case</Typography>
                                <Typography variant="h2" fontWeight="bold" textAlign="center">{data?.total}</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs boxShadow={6} borderRadius={4} p={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-evenly" >
                            <Box boxShadow={2} borderRadius={100}>
                                <MeetingRoomIcon sx={{ fontSize: 80 }} color="primary" />
                            </Box>
                            <Box>
                                <Typography variant="h5">Open Case</Typography>
                                <Typography variant="h2" fontWeight="bold" textAlign="center">{data?.data.filter((v) => v.status === MasterCaseStatus.Open).length}</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs boxShadow={6} borderRadius={4} p={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-evenly" >
                            <Box boxShadow={2} borderRadius={100}>
                                <DoorBackIcon sx={{ fontSize: 80 }} color="primary" />
                            </Box>
                            <Box>
                                <Typography variant="h5">Close Case</Typography>
                                <Typography variant="h2" fontWeight="bold" textAlign="center">{data?.data.filter((v) => v.status === MasterCaseStatus.Close).length}</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item container xs={9} gap={2}>
                    <Grid item xs boxShadow={6} borderRadius={4} p={1} >
                        {(typeof window !== 'undefined') &&
                            <ChartCaseDuration chart={data?.data} />
                        }
                    </Grid>
                    {/* <Grid item xs boxShadow={6} borderRadius={4} p={1} >
                        world4
                    </Grid> */}
                </Grid>
            </Grid>
        </>
    )
}
const ChartCaseDuration = ({ chart }: { chart: IMasterCase[] | undefined | null }) => {
    let chartData: { [key: string]: number } = {};
    chart?.map(v => {
        if (v.start_time != null && v.end_time != null) {
            // console.log(Math.floor(new Date(v.end_time).getTime() / 1000.0), Math.floor(new Date(v.start_time).getTime() / 1000.0))
            // console.log(Math.floor(Math.floor((new Date(v.end_time).getTime() / 1000.0) - Math.floor(new Date(v.start_time).getTime() / 1000.0)) / 60))
            let temp: number = 0
            if (chartData[getDayMonth(v.start_time).toString()]) temp = chartData[getDayMonth(v.start_time).toString()];
            chartData[getDayMonth(v.start_time).toString()] = temp + Math.floor((Math.floor(new Date(v.end_time).getTime() / 1000.0) - Math.floor(new Date(v.start_time).getTime() / 1000.0)) / 60)
        }
    })
    return (
        <Stack height="100%" gap={2}>
            <Typography variant="h5">Case Duration</Typography>
            <ReactApexChart
                options={{
                    chart: {
                        type: 'bar',
                        height: 1000
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: Object.keys(chartData),
                    },
                    yaxis: {
                        title: {
                            text: 'Minutes'
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + " Minutes"
                            }
                        }
                    }
                }}
                series={[{
                    name: 'Duration Case Solved in a Day',
                    data: Object.values(chartData)
                }]}
                type="bar" height="100%" />
        </Stack>
    )
}