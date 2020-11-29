import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core";


function Infobox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="inforbox__cases">{cases}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
