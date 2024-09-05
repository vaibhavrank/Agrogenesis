import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RecommendationCard = ({ title, description, image, onClick }) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
      </CardContent>
      <CardFooter>
        <Button onClick={onClick}>Learn More</Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;